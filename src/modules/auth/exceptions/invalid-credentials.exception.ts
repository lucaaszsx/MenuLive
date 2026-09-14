import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { ApiHttpException } from '#/common/exceptions/api.exception.js';

export class InvalidCredentialsException extends ApiHttpException {
    constructor() {
        super({
            code: ApiErrorCode.INVALID_CREDENTIALS,
            message: 'Invalid credentials',
            details: [],
            status: HttpStatus.UNAUTHORIZED
        });
    }
}
