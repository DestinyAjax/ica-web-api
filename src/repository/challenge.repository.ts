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

    single(data: any, type: string) {
        return getManager().getRepository(ChallengeEntity).findOne({[type]: data});
    }

    findMany(data: any, type: string) {
        return getManager().getRepository(ChallengeEntity).find({[type]: data});
    }

    update(id: any, challenge: ChallengeEntity) {
        return getManager().getRepository(ChallengeEntity).update(id, challenge);
    }

    deleteOne(challenge_id: any) {
        return getManager().getRepository(ChallengeEntity).delete(challenge_id);
    }

    deleteAll(data: any, type: string) {
        return getManager().getRepository(ChallengeEntity).delete({[type]: data});
    }
}
