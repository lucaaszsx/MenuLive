import { type CreateUserData, UserService } from '../users/user.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    public async register(data: CreateUserData) {
        return this.userService.createUser(data);
    }
}
