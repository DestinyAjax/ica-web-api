import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne} from "typeorm";
import { Player } from './players.entity';
import { Challenge } from './challenges.entity';

@Entity("submissions")
export class Submission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double'})
    score: Double

    @Column({ type: 'varchar' })
    submission_link: string

    @Column({ type: 'varchar' })
    trophy: string;

    @ManyToOne(type => Player, player => player.submissions)
    player: Player;

    @ManyToOne(type => Challenge, challenge => challenge.submissions)
    challenge: Challenge;

    @Column({ type: 'boolean' })
    is_active: boolean;

}