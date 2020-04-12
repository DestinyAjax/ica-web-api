import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { SubmissionEntity } from './submissions.entity';

@Entity("challenges")
export class ChallengeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    date: string;

    @Column({ type: 'boolean' })
    status: boolean;
 
    @OneToMany(type => SubmissionEntity, submissions => submissions.challenge)
    submissions: SubmissionEntity[];

}