import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("challenges")
export class Challenge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    date: string;

    @Column({ type: 'boolean' })
    status: boolean;

}