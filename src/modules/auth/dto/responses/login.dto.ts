import { Exclude, Expose, plainToInstance } from 'class-transformer';

@Exclude()
export class LoginResponseDTO {
    @Expose()
    public accessToken: string;

    public static from(plain: { accessToken: string }) {
        return plainToInstance(LoginResponseDTO, plain);
    }
}
