import * as express from 'express';
import { BaseRoute } from '../routes/index';
import { SubmissionRepo } from "../repository/submission.repository";
import { PlayerRepo } from "../repository/players.repository";
import { ChallengeRepo } from "../repository/challenge.repository";
import { SubmissionEntity } from "../entities/submissions.entity";
import { getManager } from "typeorm";

export class SubmissionController extends BaseRoute {

    private submissionRepo: SubmissionRepo;
    private playerRepo: PlayerRepo;
    private challengeRepo: ChallengeRepo;

    constructor() {
        super();
        this._intializeRoutes();
        this.submissionRepo = new SubmissionRepo();
        this.playerRepo = new PlayerRepo();
        this.challengeRepo = new ChallengeRepo();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/submissions`, this.getAll);
        this.router.post(`${this.path}/submission/create`, this.create);
        this.router.put(`${this.path}/submission/:submission_id`, this.update);
        this.router.get(`${this.path}/submission/:submission_id`, this.view);
        this.router.get(`${this.path}/submissions/track/:track_id`, this.getByTrack);
        this.router.delete(`${this.path}/submission/:submission_id`, this.deleteOne);
    }
 
    public getAll = async (request: express.Request, response: express.Response) => {
        try {
            let submission: SubmissionEntity = new SubmissionEntity();
            const submissions = await this.submissionRepo.all(submission);

            if (submissions === undefined) {
                response.json({
                    data: []
                });
                return;
            }

            response.json({
                data: submissions
            });
        } catch (err) {
            response.status(500).json(err);
        }
    }
 
    public create = async (request: express.Request, response: express.Response) => {
        try {
            const {email,submission_link} = request.body;
            const player = await this.playerRepo.single(email, 'email');
            const active_challenge = await this.challengeRepo.single(true, 'status');

            if (active_challenge === undefined) {
                response.status(401).json({
                    message: 'Challenge day is closed',
                    error: true
                });
            }

            if (player === undefined) {
                response.status(400).json({
                    message: "This email does not exist in our records",
                    error: true
                });
            }

            const check = await getManager().getRepository(SubmissionEntity)
                .find({ where: { player_id: player.id, challenge_id: active_challenge.id}});

            if (check.length > 0) {
                response.status(400).json({
                    message: "Submission has already been collected for this user",
                    error: true
                });
            }
            else {
                
                const submission: SubmissionEntity = new SubmissionEntity();
                submission.player_name = player.name;
                submission.submission_link = submission_link;
                submission.challenge_id = active_challenge.id;
                submission.track_id = player.track_id;
                submission.image_url = player.image_url;
                submission.player_id = player.id;
                submission.is_active = false;
                await this.submissionRepo.save(submission);

                response.json({
                    message: "Submission created successfully",
                    data: submission,
                    error: false
                });
            }
        } catch (err) {
            response.status(500).send(err);
        }
    }

    public update = async (request: express.Request, response: express.Response) => {
        try {
            const {score,trophy,submission_link} = request.body;
            const submission_id = request.params.submission_id;
            const submission = await this.submissionRepo.byId(submission_id);
            submission.score = parseFloat(score);
            submission.trophy = trophy === '' ? submission.trophy : trophy;
            submission.submission_link = submission_link;
            await this.submissionRepo.update(submission_id, submission);

            response.json({
                message: "Updated successfully",
                data: submission
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }

    public deleteAll = async (request: express.Request, response: express.Response) => {
        try {}
        catch (err) {}
    }

    public view = async (request: express.Request, response: express.Response) => {
        try {
            const submission_id = request.params.submission_id;
            const submission = await this.submissionRepo.byId(submission_id);

            response.json({
                data: submission
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }
    
    public getByTrack = async (request: express.Request, response: express.Response) => {
        try {
            const track_id = request.params.track_id;
            const submissions = await this.submissionRepo.many(track_id, 'track_id');

            response.json({
                data: submissions
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }

    public deleteOne = async (request: express.Request, response: express.Response) => {
        try {
            const submission_id = request.params.submission_id;
            await this.submissionRepo.deleteOne(submission_id);

            response.json({
                message: "Deleted successfully"
            });
        }
        catch (err) {
            response.status(500).send(err);
        }
    }
};
