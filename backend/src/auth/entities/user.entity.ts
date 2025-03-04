import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm'
import {Anecdote} from "../../anecdote/entities/anecdote.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({unique:true})
    login!:string;

    @Column('char', {length:11, unique:true, nullable:true})
    phoneNumber!:string;

    @Column("varchar", { length: 254, unique:true })
    email!:string;

    @Column('text')
    password!:string;

    @Column('varchar', {length:255, nullable:true})
    avatarUrl!:string;

    @ManyToMany(() => Anecdote, (anecdote) => anecdote.users)
    anecdotes!:Anecdote[]

}