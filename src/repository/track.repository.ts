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

    async findBy(name: string) {
        const entityManager = getManager();
        const track = await entityManager.findOne(TrackEntity, {name: name});
        return track;
    }

    update(id: any, track: TrackEntity) {
        return getManager().getRepository(TrackEntity).update(id, track);
    }
}
