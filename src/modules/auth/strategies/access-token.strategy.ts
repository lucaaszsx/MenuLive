import type { EnvConfig } from '#/config/env.js';
import type { JwtTokenPayload } from '../types/jwt-payload.type.js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(
        // @ts-expect-error
        private readonly configService: ConfigService<EnvConfig>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('jwt.accessTokenSecret', {
                infer: true
            }),
            ignoreExpiration: false
        });
    }

    override async validate(payload: JwtTokenPayload) {
        return payload;
    }
}
