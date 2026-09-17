import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { ApiHttpException } from '#/common/exceptions/api.exception.js';

export class UnauthorizedException extends ApiHttpException {
    constructor(details: string[], apiCode = ApiErrorCode.UNAUTHORIZED) {
        super({
            code: apiCode,
            message: 'Unauthorized',
            details,
            status: HttpStatus.UNAUTHORIZED
        });
    }
}
