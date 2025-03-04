import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm'
import {User} from "../../auth/entities/user.entity";

@Entity()
export class Anecdote {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    rubricName!: string;

    @Column()
    text!: string;

    @Column({ nullable: true })
    rating!: number ;

    @ManyToMany(() => User, (user) => user.anecdotes)
    @JoinTable()
    users!: User[];
}