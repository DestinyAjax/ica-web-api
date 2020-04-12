import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne} from "typeorm";
import { PlayerEntity } from './players.entity';
import { ChallengeEntity } from './challenges.entity';

@Entity("submissions")
export class SubmissionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double'})
    score: Double;

    @Column({ type: 'varchar'})
    player_name: string;

    @Column({ type: 'varchar' })
    submission_link: string

    @Column({ type: 'varchar' })
    trophy: string;

    @Column({ type: 'varchar' })
    image_url: string;

    @Column({ type: 'int' })
    player_id: Number

    @Column({ type: 'int' })
    challenge_id: Number

    @Column({ type: 'int' })
    track_id: Number;

    @ManyToOne(type => PlayerEntity, player => player.submissions)
    player: PlayerEntity;

    @ManyToOne(type => ChallengeEntity, challenge => challenge.submissions)
    challenge: ChallengeEntity;

    @Column({ type: 'boolean' })
    is_active: boolean;

}