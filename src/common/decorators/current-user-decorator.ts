import type { Request } from 'express';
import type { JwtTokenPayload } from '#/modules/auth/types/jwt-payload.type.js';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: keyof JwtTokenPayload | undefined, ctx) => {
        const user = ctx.switchToHttp().getRequest<Request>().user;
        return data ? user?.[data] : user;
    }
);
