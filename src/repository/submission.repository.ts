import { SubmissionEntity } from "../entities/submissions.entity";
import { getManager, getRepository } from "typeorm";
 
export class SubmissionRepo {
 
    all(submission: SubmissionEntity) {
        return getRepository(SubmissionEntity).createQueryBuilder('submission')
            .orderBy("submission.score", "DESC")
            .getMany();
    }
 
    save(submission: SubmissionEntity) { 
        return getManager().getRepository(SubmissionEntity).save(submission);
    }

    single(data: any, type: string) {
        return getManager().getRepository(SubmissionEntity).findOne({[type]: data});
    }

    many(data: any, type: string) {
        return getManager().getRepository(SubmissionEntity).find({[type]: data});
    }

    byId(submission_id: any) {
        return getManager().getRepository(SubmissionEntity).findOne(submission_id);
    }

    update(id: any, submission: SubmissionEntity) {
        return getManager().getRepository(SubmissionEntity).update(id, submission);
    }

    deleteOne(submission_id: any) {
        return getManager().getRepository(SubmissionEntity).delete(submission_id);
    }
}
