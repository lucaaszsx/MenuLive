import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig, { EnvConfig } from './config/env.js';

@Module({
    imports: [
        // Environment setup
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'production'
                ? '.env.production'
                : '.env.development',
            skipProcessEnv: true,
            load: [envConfig]
        }),

        // Postgres setup
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: (configService: ConfigService<EnvConfig>) => {
                const isProduction = configService.getOrThrow('env') === 'production';

                return {
                    type: 'postgres',
                    host: configService.getOrThrow('db.host', { infer: true }),
                    port: configService.getOrThrow('db.port', { infer: true }),
                    username: configService.getOrThrow('db.user', { infer: true }),
                    password: configService.getOrThrow('db.pass', { infer: true }),
                    database: configService.getOrThrow('db.dbName', { infer: true }),
                    synchronize: !isProduction,
                    logging: !isProduction
                };
            }
        }),
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
