import type { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception.js';
import { UserNotFoundException } from './exceptions/user-not-found.exception.js';

export interface CreateUserInput {
    username: string;
    password: string;
}

export type FindOneUserInput = { throwErrorOnNull: boolean } & (
    { id: string; username?: never } | { id?: never; username: string }
);

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async createUser(data: CreateUserInput) {
        if (await this.exists({ username: data.username }))
            throw new UserAlreadyExistsException();

        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    public async findOne(options: FindOneUserInput) {
        const where: FindOptionsWhere<UserEntity>[] = [];
        if (options.id) where.push({ id: options.id });
        if (options.username) where.push({ username: options.username });

        const user =
            where.length > 0 ? await this.userRepository.findOne({ where }) : null;
        if (!user && options.throwErrorOnNull) throw new UserNotFoundException();

        return user;
    }

    public async findWithPassword(options: FindOneUserInput) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password');

        if (options.id) query.orWhere('user.id = :id', { id: options.id });
        if (options.username)
            query.orWhere('user.username = :username', { username: options.username });

        const user = query.expressionMap.wheres.length > 0 ? await query.getOne() : null;
        if (!user && options.throwErrorOnNull) throw new UserNotFoundException();

        return user;
    }

    public async exists(options: Omit<FindOneUserInput, 'throwErrorOnNull'>) {
        const where: FindOptionsWhere<UserEntity>[] = [];
        if (options.id) where.push({ id: options.id });
        if (options.username) where.push({ username: options.username });

        return where.length > 0 ? await this.userRepository.exists({ where }) : false;
    }
}
