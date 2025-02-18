import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm'
import {User} from "./user";

@Entity()
export class Anekdot {

    constructor(data?: Partial<Anekdot>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    rubricName!: string;

    @Column()
    text!: string;

    @Column({ nullable: true })
    rating!: number ;

    @ManyToMany(() => User, (user) => user.anecdots)
    users!: User[];
}