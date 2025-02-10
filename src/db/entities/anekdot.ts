import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

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
}