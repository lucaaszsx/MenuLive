import type { EnvConfig } from './config/env.js';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import envConfig from './config/env.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UserModule } from './modules/users/user.module.js';

@Module({
    imports: [
        // Environment setup
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env['NODE_ENV'] === 'production'
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
                    logging: !isProduction,
                    autoLoadEntities: true
                };
            }
        }),

        // Application modules
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
