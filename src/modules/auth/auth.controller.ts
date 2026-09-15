import type { Response } from 'express';
import type { EnvConfig } from '#/config/env.js';
import { Body, Controller, HttpCode, HttpStatus, Ip, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { COOKIE_REFRESH_TOKEN_NAME } from '#/common/constants.js';
import { UserAgent } from '#/common/decorators/user-agent.decorator.js';
import { AuthService } from './auth.service.js';
import { CreateUserDTO, LoginDTO } from './dto/index.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly configService: ConfigService<EnvConfig>,
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    public async register(@Body() data: CreateUserDTO): Promise<void> {
        await this.authService.register({
            username: data.username,
            password: data.password
        });
    }

    @Post('/login')
    public async login(
        @Body() data: LoginDTO,
        @Ip() ipAddress: string,
        @UserAgent() userAgent: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const { refreshToken, accessToken } = await this.authService.login({
            username: data.username,
            password: data.password,
            ipAddress,
            userAgent
        });

        response.cookie(COOKIE_REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            secure: this.configService.getOrThrow('env') === 'production',
            maxAge: this.authService.getRefreshTokenTtlMs(),
            sameSite: 'lax',
            path: '/'
        });

        return { accessToken };
    }
}
