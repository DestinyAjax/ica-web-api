import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {TrackEntity} from "./tracks.entity";
import { SubmissionEntity } from './submissions.entity';

@Entity("players")
export class PlayerEntity {

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
    track_id: Number

    @ManyToOne(type => TrackEntity, track => track.players)
    track: TrackEntity;

    @OneToMany(type => SubmissionEntity, submissions => submissions.player)
    submissions: SubmissionEntity[];

    @Column({ type: 'boolean' })
    is_active: boolean;
}