import type { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception.js';
import { UserNotFoundException } from './exceptions/user-not-found.exception.js';

export interface CreateUserData {
    username: string;
    password: string;
}

export interface FindOneUserOptions {
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
        if (await this.existsByUsername(data.username))
            throw new UserAlreadyExistsException();

        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    public async findOne(options: FindOneUserOptions) {
        const where: FindOptionsWhere<UserEntity>[] = [];
        if (options.id) where.push({ id: options.id });
        if (options.username) where.push({ username: options.username });

        const user = await this.userRepository.find({ where });
        if (!user) throw new UserNotFoundException();

        return user;
    }

    public async findWithPassword(username: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.username = :username', { username })
            .getOne();
        if (!user) throw new UserNotFoundException();

        return user;
    }

    public async existsById(id: string) {
        return this.userRepository.existsBy({ id });
    }

    public async existsByUsername(username: string) {
        return this.userRepository.existsBy({ username });
    }
}
