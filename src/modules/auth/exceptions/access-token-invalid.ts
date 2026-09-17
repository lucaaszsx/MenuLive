import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { UnauthorizedException } from './unauthorized.exception.js';

export class AccessTokenInvalidException extends UnauthorizedException {
    constructor() {
        super(['Invalid access token'], ApiErrorCode.ACCESS_TOKEN_INVALID);
    }
}
