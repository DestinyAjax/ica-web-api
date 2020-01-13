import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
 
export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ica-yabatech",
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
    ],
    synchronize: true,
}
