import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {PlayerEntity} from "./players.entity";

@Entity("tracks")
export class TrackEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'boolean' })
    is_active: boolean;

    @OneToMany(type => PlayerEntity, players => players.track)
    players: PlayerEntity[];

}