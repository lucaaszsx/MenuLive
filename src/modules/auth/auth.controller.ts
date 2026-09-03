import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/index.js";

@Controller('users')
export class AuthController {
    @Post('/register')
    public async register(@Body() user: CreateUserDTO) {
        
        return 'funcionou';
    }
}
