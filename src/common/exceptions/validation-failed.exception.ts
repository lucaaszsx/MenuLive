import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { ApiHttpException } from '#/common/exceptions/api.exception.js';

export class ValidationFailedException extends ApiHttpException {
    constructor(details: string[] = []) {
        super({
            code: ApiErrorCode.VALIDATION_FAILED,
            message: 'Validation failed',
            details,
            status: HttpStatus.BAD_REQUEST
        });
    }
}
