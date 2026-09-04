import type { ApiErrorCode } from '../enums/api.enums.js';
import { HttpException, HttpStatus } from '@nestjs/common';

interface ApiHttpExceptionOptions {
    code: ApiErrorCode;
    message: string | object;
    details: string[];
    status: HttpStatus;
}

export class ApiHttpException extends HttpException {
    public readonly code: ApiErrorCode;
    public readonly details: string[];

    constructor(options: ApiHttpExceptionOptions) {
        super(options.message, options.status);

        this.code = options.code;
        this.details = options.details;
    }
}
