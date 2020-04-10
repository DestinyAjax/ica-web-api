import * as express from 'express';
import { BaseRoute } from '../routes/index';
import { TrackRepo } from "../repository/track.repository";
import { TrackEntity } from "../entities/tracks.entity";

export class TrackController extends BaseRoute {

    private trackRepo: TrackRepo;

    constructor() {
        super();
        this._intializeRoutes();
        this.trackRepo = new TrackRepo();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/tracks`, this.getAll);
        this.router.post(`${this.path}/tracks/create`, this.create);
    }
 
    public getAll = async (request: express.Request, response: express.Response) => {
        try {
            let track: TrackEntity = new TrackEntity();
            const tracks = await this.trackRepo.all(track);
            response.json({
                data: tracks
            });
        } catch (err) {
            console.log(err);
            response.status(500).json(err);
        }
    }
 
    public create = async (request: express.Request, response: express.Response) => {
        try {
            const {name,description} = request.body;
            const check = await this.trackRepo.findBy(name);
            console.log(check);

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
};
