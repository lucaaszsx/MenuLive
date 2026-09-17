import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { UnauthorizedException } from './unauthorized.exception.js';

export class RefreshTokenInvalidException extends UnauthorizedException {
    constructor() {
        super(['Invalid refresh token'], ApiErrorCode.REFRESH_TOKEN_INVALID);
    }
}
