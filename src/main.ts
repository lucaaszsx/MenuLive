import type { ValidationError } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { EnvConfig } from './config/env.js';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { ValidationFailedException } from './common/exceptions/validation-failed.exception.js';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter.js';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor.js';
import { flattenValidationErrors } from './common/utils/flattenValidationErrors.js';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        routeConflictPolicy: { duplicate: 'error', shadow: 'warn' }
    });
    const configService = app.get<ConfigService<EnvConfig>>(ConfigService);

    // Middlewares
    app.use(helmet());

    app.enableCors({
        origin: configService.getOrThrow('app.cors.origins', { infer: true }),
        //methods: configService.get('app.cors.methods', { infer: true }),
        credentials: true
    });

    app.use(cookieParser());

    // Application setup
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,

            exceptionFactory: (errors: ValidationError[]) => {
                const details = flattenValidationErrors(errors);
                return new ValidationFailedException(details);
            }
        })
    );
    app.useGlobalInterceptors(
        new TransformResponseInterceptor(),
        new ClassSerializerInterceptor(app.get(Reflector), {
            excludeExtraneousValues: true
        })
    );
    app.useGlobalFilters(new GlobalExceptionFilter(app.get(HttpAdapterHost)));
    app.setGlobalPrefix(configService.getOrThrow('app.prefix', { infer: true }));

    if (configService.get('env') === 'production') app.set('trust proxy', true);

    await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
await bootstrap();
