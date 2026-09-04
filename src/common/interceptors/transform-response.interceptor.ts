import {
    Injectable,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import type { ApiResponse } from '../types/api.types.js';
import type { Request } from 'express';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map<unknown, ApiResponse<unknown>>((data) => {
                return {
                    success: true,
                    path: ctx.switchToHttp().getRequest<Request>().path,
                    timestamp: new Date().toISOString(),
                    data: data ?? {},
                    error: null
                } as ApiResponse<unknown>;
            })
        );
    }
}
