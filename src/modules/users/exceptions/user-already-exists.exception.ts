import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '#/common/enums/api.enums.js';
import { ApiHttpException } from '#/common/exceptions/api.exception.js';

export class UserAlreadyExistsException extends ApiHttpException {
    constructor() {
        super({
            code: ApiErrorCode.USER_ALREADY_EXISTS,
            message: 'User already exists',
            details: [],
            status: HttpStatus.CONFLICT
        });
    }
}
