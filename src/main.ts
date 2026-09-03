import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import type { EnvConfig } from './config/env.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        routeConflictPolicy: { duplicate: 'error', shadow: 'warn' }
    });
    const configService = app.get<ConfigService<EnvConfig>>(ConfigService);
    
    // Middlewares
    app.use(helmet());
    
    app.enableCors({
        origin: configService.getOrThrow('app.cors.origins', { infer: true }),
        methods: configService.get('app.cors.methods', { infer: true }),
        credentials: true
    });

    app.use(cookieParser());

    // Application setup
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(configService.getOrThrow('app.prefix', { infer: true }));

    await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
await bootstrap();
