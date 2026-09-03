import { RefreshTokenEntity } from "./entities/refresh-token.entity.js";
import { SessionEntity } from "./entities/session.entity.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.js";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SessionEntity,
            RefreshTokenEntity
        ])
    ],
    controllers: [AuthController]
})
export class AuthModule {}
