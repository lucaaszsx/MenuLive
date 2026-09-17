import { ApiErrorCode } from '#/common/enums/api-codes.enum.js';
import { UnauthorizedException } from './unauthorized.exception.js';

export class AccessTokenExpiredException extends UnauthorizedException {
    constructor() {
        super(['Access token expired'], ApiErrorCode.ACCESS_TOKEN_EXPIRED);
    }
}
