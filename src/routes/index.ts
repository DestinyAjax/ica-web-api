import * as express from 'express';

export class BaseRoute {
    public path = '/api/v1';
    public router = express.Router();
    
    constructor () {
        this._initializeRoutes();
    };

    private _initializeRoutes() {
        this.router.get(`${this.path}/`, this.index);
    }

    public index(request: express.Request, response: express.Response) {
        response.json({
            message: "Welcome to ICA Yabatech API"
        });
    }
};
