import App from './src/app';
import {MembersController} from './src/controllers/members.controller';
 
const app = new App([
        new MembersController()
    ],
5000);
 
app.listen();