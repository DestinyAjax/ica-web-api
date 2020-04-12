import { PlayerEntity } from "../entities/players.entity";
import { getManager } from "typeorm";
 
export class PlayerRepo {
 
    all(player: PlayerEntity) {
        return getManager().getRepository(PlayerEntity).find(player);
    }
 
    create(player: PlayerEntity) { 
        return getManager().getRepository(PlayerEntity).save(player);
    }

    single(data: any, type: string) {
        return getManager().getRepository(PlayerEntity).findOne({[type]: data});
    }

    many(data: any, type: string) {
        return getManager().getRepository(PlayerEntity).find({[type]: data});
    }

    byId(player_id: any) {
        return getManager().getRepository(PlayerEntity).findOne(player_id);
    }
}
