import {MembersEntity} from "../entities/members.entity";
import {getManager} from "typeorm";
 
export class MemberRepo {
 
    getAllMembers() {
        return getManager().getRepository(MembersEntity).find();
    }
 
    saveMember(member: MembersEntity) { 
        return getManager().getRepository(MembersEntity).save(member);
    }
}
