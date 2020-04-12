import * as express from 'express';
import { BaseRoute } from '../routes/index';
import { ChallengeRepo } from "../repository/challenge.repository";
import { ChallengeEntity } from "../entities/challenges.entity";
import { timingSafeEqual } from 'crypto';

export class ChallengeController extends BaseRoute {

    private challengeRepo: ChallengeRepo;

    constructor() {
        super();
        this._intializeRoutes();
        this.challengeRepo = new ChallengeRepo();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/challenges`, this.getAll);
        this.router.post(`${this.path}/challenge/create`, this.create);
        this.router.delete(`${this.path}/challenge/:challenge_id`, this.deleteOne);
        this.router.put(`${this.path}/challenge/:challenge_id`, this.update);
        this.router.get(`${this.path}/challenge/:challenge_id`, this.view);
    }
 
    public getAll = async (request: express.Request, response: express.Response) => {
        try {
            let challenge: ChallengeEntity = new ChallengeEntity();
            const challenges = await this.challengeRepo.all(challenge);
            
            response.json({
                data: challenges
            });
        } catch (err) {
            response.status(500).json(err);
        }
    }
 
    public create = async (request: express.Request, response: express.Response) => {
        try {
            const {title,date} = request.body;
            const check = await this.challengeRepo.single(title, 'title');

            if (check && check.title === title) {
                response.status(400).json({
                    message: "This challenge already exist",
                    error: true
                });
            }
            else {
                
                const challenge: ChallengeEntity = new ChallengeEntity();
                challenge.title = title;
                challenge.date = date;
                challenge.status = false;
                await this.challengeRepo.save(challenge);

                response.json({
                    message: "Challenge created successfully",
                    data: challenge,
                    error: false
                });
            }
        } catch (err) {
            response.status(500).send(err);
        }
    }

    public deleteOne = async (request: express.Request, response: express.Response) => {
        try {
            const challenge_id = request.params.challenge_id;
            await this.challengeRepo.deleteOne(challenge_id);

            response.json({
                message: "Deleted successfully"
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }

    public update = async (request: express.Request, response: express.Response) => {
        try {
            const {title,date,status} = request.body;
            const challenge_id = request.params.challenge_id;

            if (status === true) {
                const deactivate = await this.challengeRepo.single(true, 'status');
                if (deactivate !== undefined) {
                    deactivate.status = false;
                    await this.challengeRepo.update(challenge_id, deactivate);
                }
            }

            const challenge = await this.challengeRepo.byId(challenge_id);
            challenge.title = title;
            challenge.date = date;
            challenge.status = status;
            await this.challengeRepo.update(challenge_id, challenge);

            response.json({
                message: "Updated successfully",
                data: challenge
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }

    public view = async (request: express.Request, response: express.Response) => {
        try {
            const challenge_id = request.params.challenge_id;
            const challenge = await this.challengeRepo.byId(challenge_id);
            
            response.json({
                data: challenge
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }
};
