import { PlayerEntity } from "../entities/players.entity";
import { getManager } from "typeorm";
 
export class PlayerRepo {
 
    getAllPlayers(player: PlayerEntity) {
        return getManager().getRepository(PlayerEntity).find(player);
    }
 
    createNewPlayer(player: PlayerEntity) { 
        return getManager().getRepository(PlayerEntity).save(player);
    }

    getSinglePlayer(email: string) {
        return getManager().getRepository(PlayerEntity).findOne({email: email});
    }
}
