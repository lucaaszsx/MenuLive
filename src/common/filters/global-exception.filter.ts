import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';
import type { Request, Response } from 'express';
import { Catch } from '@nestjs/common';
import { ApiHttpException } from '../exceptions/api.exception.js';
import { InternalServerException } from '../exceptions/internal-error.exception.js';
import { createApiResponse } from '../utils/createApiResponse.js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const apiException =
            exception instanceof ApiHttpException
                ? exception
                : new InternalServerException();

        httpAdapter.reply(
            ctx.getResponse<Response>(),

            createApiResponse({
                success: false,
                path: ctx.getRequest<Request>().path,
                exception: apiException
            }),

            apiException.getStatus()
        );
    }
}
