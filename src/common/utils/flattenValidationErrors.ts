import type { ValidationError } from '@nestjs/common';

export function flattenValidationErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => {
        const errors = error.constraints ? Object.values(error.constraints) : [];
        const children = error.children ? flattenValidationErrors(error.children) : [];

        return [...errors, ...children];
    });
}
