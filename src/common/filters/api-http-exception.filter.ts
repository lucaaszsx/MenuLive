import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/api.types.js';
import { Catch } from '@nestjs/common';
import { ApiHttpException } from '../exceptions/api.exception.js';

@Catch(ApiHttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: ApiHttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        ctx.getResponse<Response<ApiResponse<unknown>>>()
            .status(exception.getStatus())
            .json({
                success: false,
                path: ctx.getRequest<Request>().path,
                timestamp: new Date().toISOString(),
                data: null,
                error: {
                    code: exception.code,
                    message: exception.message,
                    details: exception.details
                }
            });
    }
}
