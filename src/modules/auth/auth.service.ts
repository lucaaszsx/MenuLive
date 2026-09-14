import type { EnvConfig } from '#/config/env.js';
import type { UserEntity } from '../users/entities/user.entity.js';
import type { CreateUserInput } from '../users/user.service.js';
import type { SessionEntity } from './entities/session.entity.js';
import type { JwtTokenPayload } from './types/jwt-payload.type.js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service.js';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception.js';
import bcrypt from 'bcrypt';

export interface LoginInput {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
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
    }

    public async issueTokenPair(user: UserEntity, session: SessionEntity) {
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
            expiresIn: this.configService.getOrThrow('jwt.refreshTokenExpiresIn', {
                infer: true
            })
        });

        return { refreshToken, accessToken };
    }
}
