import type { JwtTokenPayload } from '../types/jwt-payload.type.js';
import { Injectable } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access') {
    override handleRequest<TUser = JwtTokenPayload>(err: any, user: TUser): TUser {
        if (err instanceof TokenExpiredError)
            throw new UnauthorizedException(['Access token expired']);
        if (err && !user) throw new UnauthorizedException(['Invalid access token']);
        return user;
    }
}
