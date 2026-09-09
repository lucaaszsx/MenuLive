import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import type { ApiResponse } from '../types/api.types.js';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { createApiResponse } from '../utils/createApiResponse.js';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map<unknown, ApiResponse<unknown>>((data) => {
                return createApiResponse({
                    success: true,
                    path: ctx.switchToHttp().getRequest<Request>().path,
                    data: data ?? null
                });
            })
        );
    }
}
