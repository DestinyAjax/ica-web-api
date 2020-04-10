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

    findBy(name: string) {
        return getManager().getRepository(TrackEntity).findOne({name: name});
    }

    update(id: any, track: TrackEntity) {
        return getManager().getRepository(TrackEntity).update(id, track);
    }
}
