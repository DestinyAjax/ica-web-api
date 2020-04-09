import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("players")
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    telephone: string;

    @Column({ type: 'varchar' })
    school: string;

    @Column({ type: 'varchar' })
    image_url: string;

    @Column({ type: 'varchar' })
    twitter_url: string;

    @Column({ type: 'int' })
    track_id: number;

    @Column({ type: 'boolean' })
    is_active: boolean;

}