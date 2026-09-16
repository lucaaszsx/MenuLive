import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '#/common/decorators/current-user-decorator.js';
import { AccessTokenGuard } from '../auth/guards/access-token.guard.js';
import { UserResponseDTO } from './dto/responses/user.dto.js';
import { UserService } from './user.service.js';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AccessTokenGuard)
    @Get('/@me')
    public async getMe(@CurrentUser('uid') id: string) {
        console.log(id);
        const user = await this.userService.findOne({ id, throwErrorOnNull: true });
        return UserResponseDTO.from(user!);
    }
}
