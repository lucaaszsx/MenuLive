import type { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';

export const UserAgent = createParamDecorator((_data: unknown, ctx): string => {
    return ctx.switchToHttp().getRequest<Request>().headers['user-agent'] || '';
});
