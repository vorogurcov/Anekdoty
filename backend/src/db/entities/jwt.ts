import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class UserRefreshJwt {
    @PrimaryColumn()
    user_id!: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    refreshJwt!: string;
}