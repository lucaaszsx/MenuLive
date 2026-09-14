import type { DataSource } from 'typeorm';
import type { EnvConfig } from '#/config/env.js';
import type { UserEntity } from '../users/entities/user.entity.js';
import type { CreateUserInput } from '../users/user.service.js';
import type { JwtTokenPayload } from './types/jwt-payload.type.js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import ms from 'ms';
import { UserService } from '../users/user.service.js';
import { RefreshTokenEntity } from './entities/refresh-token.entity.js';
import { SessionEntity } from './entities/session.entity.js';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception.js';
import { createHash } from 'node:crypto';

export interface LoginInput {
    username: string;
    password: string;
    ipAddress: string;
    userAgent: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        private readonly configService: ConfigService<EnvConfig>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async register(data: CreateUserInput) {
        return this.userService.createUser(data);
    }

    public async login(data: LoginInput) {
        const user = await this.userService.findWithPassword({ username: data.username });
        if (!user || !(await bcrypt.compare(data.password, user.password)))
            throw new InvalidCredentialsException();

        return new Promise<{ refreshToken: string; accessToken: string }>(
            async (resolve) => {
                await this.dataSource.transaction(async (manager) => {
                    const dbSession = manager.create(SessionEntity, {
                        userId: user.id,
                        userAgent: data.userAgent,
                        ipAddress: data.ipAddress
                    });
                    await manager.save(SessionEntity, dbSession);

                    const { hashedRefreshToken, refreshToken, accessToken } =
                        await this.issueTokenPair(user, dbSession);
                    const dbRefreshToken = manager.create(RefreshTokenEntity, {
                        sessionId: dbSession.id,
                        expiresAt: new Date(Date.now() + this.getRefreshTokenTtlMs()),
                        token: hashedRefreshToken
                    });
                    await manager.save(RefreshTokenEntity, dbRefreshToken);

                    resolve({ refreshToken, accessToken });
                });
            }
        );
    }

    public getRefreshTokenTtlMs() {
        return ms(
            this.configService.getOrThrow('jwt.refreshTokenExpiresIn', {
                infer: true
            })
        );
    }

    private async issueTokenPair(user: UserEntity, session: SessionEntity) {
        const payload: JwtTokenPayload = { uid: user.id, sid: session.id };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('jwt.accessTokenSecret', {
                infer: true
            }),
            expiresIn: this.configService.getOrThrow('jwt.accessTokenExpiresIn', {
                infer: true
            })
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('jwt.refreshTokenSecret', {
                infer: true
            }),
            expiresIn: this.getRefreshTokenTtlMs()
        });

        return {
            hashedRefreshToken: createHash('sha256').update(refreshToken).digest('hex'),
            refreshToken,
            accessToken
        };
    }
}
