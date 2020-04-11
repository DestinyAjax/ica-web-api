import App from './src/app';
import { MembersController } from './src/controllers/members.controller';
import { PlayersController } from './src/controllers/players.controller';
import { validateEnv } from './src/utils/helpers';
import { TrackController } from './src/controllers/tracks.controller';
import { ChallengeController } from './src/controllers/challenges.controller';
import { SubmissionController } from './src/controllers/submissions.controller';

validateEnv();
 
const app = new App([
    new MembersController(),
    new PlayersController(),
    new TrackController(),
    new ChallengeController(),
    new SubmissionController()],
process.env.PORT || 5000);

app.listen();