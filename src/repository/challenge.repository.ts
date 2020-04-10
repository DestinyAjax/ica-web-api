import { ChallengeEntity } from "../entities/challenges.entity";
import { getManager } from "typeorm";
 
export class ChallengeRepo {
 
    all(challenge: ChallengeEntity) {
        return getManager().getRepository(ChallengeEntity).find(challenge);
    }
 
    save(challenge: ChallengeEntity) { 
        return getManager().getRepository(ChallengeEntity).save(challenge);
    }

    byId(id: any) {
        return getManager().getRepository(ChallengeEntity).findOne(id);
    }

    single(title: string) {
        return getManager().getRepository(ChallengeEntity).findOne({title: title});
    }

    update(id: any, challenge: ChallengeEntity) {
        return getManager().getRepository(ChallengeEntity).update(id, challenge);
    }
}
