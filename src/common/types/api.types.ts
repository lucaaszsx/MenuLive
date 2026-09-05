import type { ApiErrorCode } from '../enums/api-codes.enum.js';

interface ApiResponseError {
    readonly code: ApiErrorCode;
    readonly message: string;
    readonly details: string[];
}

interface BaseApiResponse {
    readonly path: string;
    readonly timestamp: string;
}

export type ApiResponse<T> =
    | (BaseApiResponse & {
          readonly success: true;
          readonly data: T;
          readonly error: null;
      })
    | (BaseApiResponse & {
          readonly success: false;
          readonly data: null;
          readonly error: ApiResponseError;
      });
