import * as fs from "fs";
import * as cloudinary from "cloudinary";
// import { Logger } from "@overnightjs/logger";

export default class File {
    protected readonly dir = "uploads";
    protected cloud: any;

    constructor() {
        cloudinary.v2.config({
            cloud_name: 'destinyajax3000',
            api_key: '598116344457674',
            api_secret: 'Ygi5G9JG8SK3_4N6vUwrtvhgDoc',
        });
    }

    public localUpload(file: any, dest: string, name: string, extension: string): string {
        if (typeof file !== "undefined" || file !==  "" || file !== null) {
            return this.uploadFile(file, dest, name, extension);
        }
        return "";
    }

    public cloudUpload(file: any, dir: string) {
        if (typeof file !== "undefined" || file !== "" || file !== null) {
            return new Promise<any>((resolve, reject) => {
                cloudinary.v2.uploader.upload(file, {folder: dir}, (error, result) => {
                    resolve(result.url);
                    reject(error);
                });
            });
        }
        return;
    }

    private uploadFile(file: any, dest: any, name: string, extension: string): string {
        let image = file.replace(/^data:.*,/, "");
        image = image.replace(/ /g, "+");
        const bitmap = new Buffer(image, "base64");
        const url = this.dir + dest + name + "-" + Date.now() + extension;
        fs.writeFileSync(url, bitmap);
        return url;
    }
}