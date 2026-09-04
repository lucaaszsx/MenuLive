import type { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';

export const UserAgent = createParamDecorator((_data: unknown, ctx): string => {
    const ua = ctx.switchToHttp().getRequest<Request>().headers['user-agent'];

    return ua || '';
});
