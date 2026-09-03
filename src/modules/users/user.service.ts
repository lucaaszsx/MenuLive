import type { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity.js";
import { Injectable } from "@nestjs/common";

interface CreateUserData {
    name: string;
    username: string;
    password: string;
}

interface FindOneUserOptions {
    id?: string;
    username?: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async createUser(data: CreateUserData) {
        
    }

    public async findOne(options: FindOneUserOptions) {
        const where: FindOptionsWhere<UserEntity> = {};
        if (options.id) where.id = options.id;
        if (options.username) where.username = options.username;

        const user = await this.userRepository.find({ where });
        if (!user) throw new Error('USER_NOT_FOUND'); 

        return user;
    }

    public async findWithPassword(options: FindOneUserOptions) {
        const user = await this.userRepository
            .createQueryBuilder();
    }

    public async existsById(id: string) {
        return this.userRepository.existsBy({ id });
    }

    public async existsByUsername(username: string) {
        return this.userRepository.existsBy({ username });
    }
}