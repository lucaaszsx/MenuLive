import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from './dto/index.js';
import { AuthService } from './auth.service.js';
import { UserAgent } from '#/common/decorators/index.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    public async register(@Body() data: CreateUserDTO) {
        return this.authService.register({
            username: data.username,
            password: data.password
        });
    }

    @Post('/login')
    public async login(
        @Body() _data: LoginDTO,
        @Ip() _ipAddress: string,
        @UserAgent() _userAgent: string
    ) {}

    @Get('/@me')
    public async getMe() {}
}
