import type { JwtTokenPayload } from '../types/jwt-payload.type.js';
import { Injectable } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenExpiredException } from '../exceptions/access-token-expired.exception.js';
import { AccessTokenInvalidException } from '../exceptions/access-token-invalid.js';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access') {
    override handleRequest<TUser = JwtTokenPayload>(
        err: any,
        user: TUser,
        info: any
    ): TUser {
        if (info instanceof TokenExpiredError) throw new AccessTokenExpiredException();
        if (err || !user) throw new AccessTokenInvalidException();
        return user;
    }
}
