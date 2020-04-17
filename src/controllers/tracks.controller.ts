import * as express from 'express';
import { BaseRoute } from '../routes/index';
import { TrackRepo } from "../repository/track.repository";
import { PlayerRepo } from "../repository/players.repository";
import { SubmissionRepo } from "../repository/submission.repository";
import { TrackEntity } from "../entities/tracks.entity";
import { ChallengeRepo } from '../repository/challenge.repository';
import { getRepository } from "typeorm";
import { ChallengeEntity } from '../entities/challenges.entity';
import { SubmissionEntity } from '../entities/submissions.entity';

export class TrackController extends BaseRoute {

    private trackRepo: TrackRepo;
    private playerRepo: PlayerRepo;
    private submissionRepo: SubmissionRepo;
    private challengeRepo: ChallengeRepo;

    constructor() {
        super();
        this._intializeRoutes();
        this.trackRepo = new TrackRepo();
        this.playerRepo = new PlayerRepo();
        this.submissionRepo = new SubmissionRepo();
        this.challengeRepo = new ChallengeRepo();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/tracks`, this.getAll);
        this.router.post(`${this.path}/tracks/create`, this.create);
        this.router.get(`${this.path}/track/:track_id/players`, this.getAllPlayers);
        this.router.get(`${this.path}/track/:track_id/submissions`, this.getAllSubmissions);
        this.router.get(`${this.path}/challenge/:track_id/submissions`, this.challengeSubmissions);
    }
 
    public getAll = async (request: express.Request, response: express.Response) => {
        try {
            let track: TrackEntity = new TrackEntity();
            const tracks = await this.trackRepo.all(track);

            response.json({
                data: tracks
            });
        } catch (err) {
            response.status(500).json(err);
        }
    }
 
    public create = async (request: express.Request, response: express.Response) => {
        try {
            const {name,description} = request.body;
            const check = await this.trackRepo.findBy(name);

            if (check && check.name === name) {
                response.status(400).json({
                    message: "This track name already exist",
                    error: true
                });
            }
            else {
                
                const track: TrackEntity = new TrackEntity();
                track.name = name;
                track.description = description;
                track.is_active = true;
                await this.trackRepo.save(track);

                response.json({
                    message: "Track created successfully",
                    data: track,
                    error: false
                });
            }
        } catch (err) {
            response.status(500).send(err);
        }
    }

    public getAllPlayers = async (request: express.Request, response: express.Response) => {
        try {
            const track_id: any = request.params.track_id;
            const players = await this.playerRepo.many(track_id, 'track_id');

            if (players === undefined) {
                response.json({
                    data: []
                });
                return;
            }

            response.json({
                data: players
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }

    public getAllSubmissions = async (request: express.Request, response: express.Response) => {
        try {
            const track_id: any = request.params.track_id;
            const active_challenge = await this.challengeRepo.single(true, 'status');
            const submissions = await this.submissionRepo.many(track_id, 'track_id');

            if (submissions === undefined) {
                response.json({
                    data: []
                });
                return;
            }

            response.json({
                data: submissions
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }

    public challengeSubmissions = async (request: express.Request, response: express.Response) => {
        try {
            const track_id: any = request.params.track_id;
            const date = new Date();
            const format = date.toLocaleDateString().split('/');
            const data = `${format[2]}-${parseInt(format[0]) <= 10 ? `0${format[0]}` : format[0]}-${format[1]}`;
            const active_challenge = await this.challengeRepo.single(data, 'date');
            const challenges = await getRepository(SubmissionEntity)
                .createQueryBuilder("submission")
                .where({ track_id: track_id, challenge_id: active_challenge.id})
                .orderBy("submission.score", "DESC")
                .getMany();
                
            if (challenges === undefined) {
                response.json({
                    data: []
                });
                return;
            }

            response.json({
                data: challenges
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }
};
