import type { NestExpressApplication } from '@nestjs/platform-express';
import type { EnvConfig } from './config/env.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor.js';

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
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformResponseInterceptor());
    app.setGlobalPrefix(configService.getOrThrow('app.prefix', { infer: true }));

    if (configService.get('env') === 'production') app.set('trust proxy', true);

    await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
await bootstrap();
