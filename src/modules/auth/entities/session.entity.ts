import { BaseEntity } from "@/database/base.entity.js";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, type Relation } from "typeorm";
import { RefreshTokenEntity } from "./refresh-token.entity.js";
import { UserEntity } from "@/modules/users/user.entity.js";

@Entity('sessions')
export class SessionEntity extends BaseEntity {
    @Column({ name: 'user_id', type: 'uuid' })
    public userId: string;

    @ManyToOne(() => UserEntity, (user) => user.sessions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user: Relation<UserEntity>;

    @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
    public revokedAt: Date | null;

    @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.session)
    public refreshTokens: Relation<RefreshTokenEntity[]>;
}