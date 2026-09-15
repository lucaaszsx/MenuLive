import type { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';
import type { JwtTokenPayload } from '#/modules/auth/types/jwt-payload.type.js';

export const CurrentUser = createParamDecorator((data: keyof JwtTokenPayload | undefined, ctx) => {
    const user = ctx.switchToHttp().getRequest<Request>().user;
    return data ? user?.[data] : user;
});
