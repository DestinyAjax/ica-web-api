import * as express from 'express';
import File from '../utils/file.utility';
import BaseService from "../services/base.service";
import { BaseRoute } from '../routes/index';
import { PlayerRepo } from "../repository/players.repository";
import { TrackRepo } from "../repository/track.repository"
import { PlayerEntity } from "../entities/players.entity";
import { TrackEntity } from "../entities/tracks.entity";


export class PlayersController extends BaseRoute {

    private playerRepo: PlayerRepo;
    private trackRepo: TrackRepo;
    private file: any;
    private service: any;

    constructor() {
        super();
        this._intializeRoutes();
        this.file = new File();
        this.service = new BaseService();
        this.playerRepo = new PlayerRepo();
        this.trackRepo = new TrackRepo();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/players`, this.getAll);
        this.router.post(`${this.path}/players/create`, this.create);
        this.router.put(`${this.path}/players/update`, this.update);
    }
 
    public getAll = async (request: express.Request, response: express.Response) => {
        try {
            let player: PlayerEntity = new PlayerEntity();
            const players = await this.playerRepo.getAllPlayers(player);
            response.json({
                data: players
            });
        } catch (err) {
            console.log(err);
            response.status(500).json(err);
        }
    }
 
    public create = async (request: express.Request & {files}, response: express.Response) => {
        try {
            const {email,name,telephone,image_url,twitter_url,track_id,school} = request.body;
            const check = await this.playerRepo.getSinglePlayer(email);

            if (check !== undefined) {
                response.status(400).json({
                    message: "This email address already exist",
                    error: true
                });
            }
            else {
                const imageUrl = await this.file.cloudUpload(`${image_url}`, "ICA-Challenge/");
                
                const player: PlayerEntity = new PlayerEntity();
                player.email = email;
                player.name = name;
                player.telephone = telephone;
                player.twitter_url = twitter_url;
                player.school = school;
                player.image_url = imageUrl;
                player.is_active = true;
                await this.playerRepo.createNewPlayer(player);

                const track: TrackEntity = await this.trackRepo.single(track_id);
                track.players = [player];
                this.trackRepo.update(track_id, track);

                response.json({
                    message: "Player created successfully",
                    data: player,
                    error: false
                });
            }
        } catch (err) {
            response.status(500).send(err);
        }
    }

    public update = async (request: express.Request, response: express.Response) => {

    }
};
