import {Entity, PrimaryGeneratedColumn, Column, Double} from "typeorm";

@Entity("submissions")
export class Submission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    player_id: number;

    @Column({ type: 'int' })
    track_id: number;

    @Column({ type: 'double'})
    score: Double

    @Column({ type: 'varchar' })
    submission_link: string

    @Column({ type: 'varchar' })
    trophy: string;

    @Column({ type: 'boolean' })
    is_active: boolean;

}