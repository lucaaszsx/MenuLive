import { BaseEntity } from "@/database/base.entity.js";
import { Column, Entity, JoinColumn, ManyToOne, type Relation } from "typeorm";
import { SessionEntity } from "./session.entity.js";

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
    @Column({ name: 'session_id', type: 'uuid' })
    public sessionId: string;

    @ManyToOne(() => SessionEntity, (session) => session.refreshTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'session_id' })
    public session: Relation<SessionEntity>;

    @Column({ type: 'text', comment: 'refresh token hash' })
    public token: string;

    @Column({ name: 'expires_at', type: 'timestamptz' })
    public expiresAt: Date;

    @Column({ type: 'boolean', default: false })
    public revoked: boolean;
}