import * as mongoose from 'mongoose';

export default class DatabseUtitity {

    public mongodb() {
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo ...");
            setTimeout(() => {
                mongoose.connect("mongodb+srv://ajax-2020:<password>@cluster0-k4ukt.mongodb.net/test?retryWrites=true&w=majority",{
                    useNewUrlParser: true,
                    autoReconnect: true, keepAlive: true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000,
                });
            }, 3000);
        });

        connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });

        connection.on("error", (error: Error) => {
            console.log("Mongo Connection ERROR: " + error);
        });

        const run = async () => {
            await mongoose.connect("mongodb+srv://ajax-2020:<password>@cluster0-k4ukt.mongodb.net/test?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                autoReconnect: true, keepAlive: true,
            });
        };

        run().catch((error: Error) => console.log(error));
    }
}