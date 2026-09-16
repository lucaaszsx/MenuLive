import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule.register({})],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
