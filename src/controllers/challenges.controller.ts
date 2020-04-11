import * as express from 'express';
import { BaseRoute } from '../routes/index';
import { ChallengeRepo } from "../repository/challenge.repository";
import { ChallengeEntity } from "../entities/challenges.entity";

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
};
