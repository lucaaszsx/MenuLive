import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { RefreshTokenEntity } from './entities/refresh-token.entity.js';
import { SessionEntity } from './entities/session.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity, RefreshTokenEntity]), UserModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
