import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '#/database/base.entity.js';
import { SessionEntity } from '../auth/entities/session.entity.js';

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 64 })
    public username: string;

    @Column({
        type: 'char',
        length: 255,
        select: false,
        comment: 'hashed password'
    })
    public password: string;

    @OneToMany(() => SessionEntity, (session) => session.user)
    public sessions: Relation<SessionEntity[]>;
}
