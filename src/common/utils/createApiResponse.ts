import type { ApiHttpException } from '../exceptions/api.exception.js';
import type { ApiResponse } from '../types/api.types.js';

export type CreateApiResponseOptions<T> =
    | {
          success: true;
          path: string;
          data: T;
      }
    | {
          success: false;
          path: string;
          exception: ApiHttpException;
      };

export function createApiResponse<T = unknown>(
    options: CreateApiResponseOptions<T>
): ApiResponse<T> {
    const timestamp = new Date().toISOString();

    if (options.success) {
        return {
            success: true,
            path: options.path,
            timestamp,
            data: options.data,
            error: null
        };
    } else {
        const { exception } = options;

        return {
            success: false,
            path: options.path,
            timestamp,
            data: null,
            error: {
                code: exception.code,
                message: exception.message,
                details: exception.details
            }
        };
    }
}
