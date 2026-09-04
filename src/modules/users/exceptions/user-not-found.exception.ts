import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '#/common/enums/api.enums.js';
import { ApiHttpException } from '#/common/exceptions/api.exception.js';

export class UserNotFoundException extends ApiHttpException {
    constructor() {
        super({
            code: ApiErrorCode.USER_NOT_FOUND,
            message: 'User not found',
            details: [],
            status: HttpStatus.NOT_FOUND
        });
    }
}
