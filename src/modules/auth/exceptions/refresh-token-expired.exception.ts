import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { UnauthorizedException } from './unauthorized.exception.js';

export class RefreshTokenExpiredException extends UnauthorizedException {
    constructor() {
        super(['Refresh token expired'], ApiErrorCode.REFRESH_TOKEN_EXPIRED);
    }
}
