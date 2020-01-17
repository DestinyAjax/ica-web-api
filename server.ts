import App from './src/app';
import {MembersController} from './src/controllers/members.controller';
import {validateEnv} from './src/utils/helpers';

validateEnv();
 
const app = new App([
        new MembersController()
    ],
    process.env.PORT || 5000);

app.listen();