export enum ApiErrorCode {
    // Internal
    INTERNAL_SERVER_ERROR = 10_000,

    // Validation
    VALIDATION_FAILED = 11_000,

    // User
    USER_ALREADY_EXISTS = 12_000,
    USER_NOT_FOUND,
    INVALID_CREDENTIALS,
    UNAUTHORIZED
}
