import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
    public async register(username: string, password: string) {
        
    }
}