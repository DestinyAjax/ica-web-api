import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import * as url from "url-parse";

let db_url = new url(process.env.CLEARDB_DATABASE_URL);
const username = db_url.username;
const password = db_url.password;
const host = db_url.host;
const database = db_url.pathname.replace("/", "");

export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: process.env.NODE_ENV === "production" ? host : "localhost",
    port: 3306,
    username: process.env.NODE_ENV === "production" ? username : "root",
    password: process.env.NODE_ENV === "production" ? password : "",
    database: process.env.NODE_ENV === "production" ? database : "ica-web",
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
    ],
    synchronize: true,
}
