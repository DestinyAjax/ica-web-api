import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {TrackEntity} from "./tracks.entity";
import { Submission } from './submissions.entity';

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

    @ManyToOne(type => TrackEntity, track => track.players)
    track: TrackEntity;

    @OneToMany(type => Submission, submissions => submissions.player)
    submissions: Submission[];

    @Column({ type: 'boolean' })
    is_active: boolean;

}