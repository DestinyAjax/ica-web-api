import * as nodemailer from "nodemailer";
import {config} from "../utils/app.config";

export default class BaseService {

    protected client: any;

    constructor() {
        this.client = nodemailer.createTransport({
        service: "SendGrid",
            auth: {
                user: config.mail.auth.api_user,
                pass: config.mail.auth.api_key,
            },
        });
    }

    public Email(email: any, subject: string, message: string) {
        try {
            const data = {
                from: config.app.name,
                to: (email) ? email : config.app.email,
                subject,
                html: message,
            };

            this.client.sendMail(data, (err: Error, info: any) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Message sent: " + info.response);
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public html(data: any): string {
        return  `<div id="content" style="background-color: #1D4BB7width:100%">
            <div style="background-color: #fefefepadding:20pxcolor:#000">${data}</div>
        </div>`;
    }
}