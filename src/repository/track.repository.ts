import { TrackEntity } from "../entities/tracks.entity";
import { getManager } from "typeorm";
 
export class TrackRepo {
 
    all(track: TrackEntity) {
        return getManager().getRepository(TrackEntity).find(track);
    }
 
    save(track: TrackEntity) { 
        return getManager().getRepository(TrackEntity).save(track);
    }

    single(id: any) {
        return getManager().getRepository(TrackEntity).findOne(id);
    }

    update(id: any, track: TrackEntity) {
        return getManager().getRepository(TrackEntity).update(id, track);
    }
}
