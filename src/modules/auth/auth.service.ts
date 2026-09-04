import type { CreateUserData } from '../users/user.service.js';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service.js';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    public async register(data: CreateUserData) {
        return this.userService.createUser(data);
    }
}
