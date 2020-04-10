import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne} from "typeorm";
import { PlayerEntity } from './players.entity';
import { ChallengeEntity } from './challenges.entity';

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

    @ManyToOne(type => PlayerEntity, player => player.submissions)
    player: PlayerEntity;

    @ManyToOne(type => ChallengeEntity, challenge => challenge.submissions)
    challenge: ChallengeEntity;

    @Column({ type: 'boolean' })
    is_active: boolean;

}