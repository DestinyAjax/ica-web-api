import App from './src/app';
import { MembersController } from './src/controllers/members.controller';
import { PlayersController } from './src/controllers/players.controller';
import { validateEnv } from './src/utils/helpers';
import { TrackController } from './src/controllers/tracks.controller';

validateEnv();
 
const app = new App([
        new MembersController(),
        new PlayersController(),
        new TrackController()
    ],
    process.env.PORT || 5000);

app.listen();