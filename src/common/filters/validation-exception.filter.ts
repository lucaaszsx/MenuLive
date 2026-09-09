import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { BadRequestException, Catch } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(_exception: ValidationError, _host: ArgumentsHost) {
        //const ctx = host.switchToHttp();
        console.log(_exception);
    }
}
