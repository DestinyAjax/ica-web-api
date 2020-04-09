import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Submission } from './submissions.entity';

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
 
    @OneToMany(type => Submission, submissions => submissions.challenge)
    submissions: Submission[];

}