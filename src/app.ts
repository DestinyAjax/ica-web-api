import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as appConfig from "../src/utils/database";
import {createConnection} from "typeorm";

import errorMiddleware from "./middleware/error.middleware";
 
class App {
    public app: express.Application;
    public port: 3000;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandler();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandler() {
        this.app.use(errorMiddleware);
    }

    private async connectToTheDatabase() {
        try {
            await createConnection(appConfig.dbOptions);
            console.log("Database connected!");
        } catch (err) {
            console.log(err);
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
};
 
export default App;