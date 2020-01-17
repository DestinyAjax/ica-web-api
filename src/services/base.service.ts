import * as nodemailer from "nodemailer";
import {config} from "../utils/app.config";

export default class CoreService {

    protected  client: any;

    constructor() {
        this.client = nodemailer.createTransport({
        service: "SendGrid",
            auth: {
                user: config.mail.auth.api_user,
                pass: config.mail.auth.api_key,
            },
        });
    }

    public Email(data: any, subject: string, message: string) {
        try {
            const email = {
                from: config.app.name,
                to: (data.email) ? data.email : config.app.email,
                subject,
                html: message,
            };

            this.client.sendMail(email, (err: Error, info: any) => {
                if (err) {
                } else {
                    // Logger.Imp("Message sent: " + info.response);
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public html(data: any): string {
        return  `<div id="content" style="background-color: #1D4BB7width:100%">
            <nav>
                <div class="container-fluid">
                    <span><a href="https://refill-app.herokuapp.com"><img src="https://refillappapi.herokuapp.com/uploads/images/refill_logo.png" style="width: 120px height: 45px padding:10px" class="img-responsive"></a></span>
                </div>
            </nav>
            <div style="background-color: #fefefepadding:20pxcolor:#000">${data}</div>
        </div>`;
    }
}