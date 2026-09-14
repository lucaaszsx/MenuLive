import type { UserEntity } from '../../entities/user.entity.js';
import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class UserResponseDTO {
    @Expose()
    public id: string;

    @Expose()
    public username: string;

    @Expose()
    public createdAt: Date;

    public static from(partial: Partial<UserEntity>) {
        return plainToInstance(UserResponseDTO, partial);
    }
}
