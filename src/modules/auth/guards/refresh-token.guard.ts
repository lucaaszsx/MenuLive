import type { JwtTokenPayload } from '../types/jwt-payload.type.js';
import { Injectable } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    override handleRequest<TUser = JwtTokenPayload>(err: any, user: TUser, info: any): TUser {
        if (info instanceof TokenExpiredError)
            throw new UnauthorizedException(['Refresh token expired']);
        if (err && !user) throw new UnauthorizedException(['Invalid refresh token']);
        return user;
    }
}
