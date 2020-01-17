import {MembersEntity} from "../entities/members.entity";
import {getManager} from "typeorm";
 
export class MemberRepo {
 
    getAllMembers(member: MembersEntity) {
        return getManager().getRepository(MembersEntity).find(member);
    }
 
    saveMember(member: MembersEntity) { 
        return getManager().getRepository(MembersEntity).save(member);
    }

    getOneMember(email: string) {
        return getManager().getRepository(MembersEntity).findOne({email: email});
    }
}
