import type { UserEntity } from '../../entities/user.entity.js';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDTO {
    @Expose()
    public id: string;

    @Expose()
    public username: string;

    @Expose()
    public createdAt: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
