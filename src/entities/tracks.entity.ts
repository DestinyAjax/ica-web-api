import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("tracks")
export class Track {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'boolean' })
    is_active: boolean;

}