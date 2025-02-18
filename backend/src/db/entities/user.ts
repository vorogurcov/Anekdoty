import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    Column,
    JoinTable
} from 'typeorm'
import {Anekdot} from "./anekdot";

@Entity()
export class User{

    constructor(data?: Partial<User>){
        if(data)
            Object.assign(this,data);
    }
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column()
    email!:string;

    @Column()
    password!:string;

    @ManyToMany(() => Anekdot,(anecdot) => anecdot.users)
    @JoinTable()

    anecdots!:Anekdot[];

}
