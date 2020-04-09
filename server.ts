import App from './src/app';
import { MembersController } from './src/controllers/members.controller';
import { PlayersController } from './src/controllers/players.controller';
import { validateEnv } from './src/utils/helpers';

validateEnv();
 
const app = new App([
        new MembersController(),
        new PlayersController()
    ],
    process.env.PORT || 5000);

app.listen();