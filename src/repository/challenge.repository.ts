import { ChallengeEntity } from "../entities/challenges.entity";
import { getManager } from "typeorm";
 
export class ChallengeRepo {
 
    all(challenge: ChallengeEntity) {
        return getManager().getRepository(ChallengeEntity).find(challenge);
    }
 
    save(challenge: ChallengeEntity) { 
        return getManager().getRepository(ChallengeEntity).save(challenge);
    }

    single(id: any) {
        return getManager().getRepository(ChallengeEntity).findOne(id);
    }

    update(id: any, challenge: ChallengeEntity) {
        return getManager().getRepository(ChallengeEntity).update(id, challenge);
    }
}