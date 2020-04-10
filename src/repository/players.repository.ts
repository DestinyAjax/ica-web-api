import { PlayerEntity } from "../entities/players.entity";
import { getManager } from "typeorm";
 
export class PlayerRepo {
 
    all(player: PlayerEntity) {
        return getManager().getRepository(PlayerEntity).find(player);
    }
 
    create(player: PlayerEntity) { 
        return getManager().getRepository(PlayerEntity).save(player);
    }

    single(email: string) {
        return getManager().getRepository(PlayerEntity).findOne({email: email});
    }
}
