import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity.js";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export class UserModule {}