import * as express from 'express';
import File from '../utils/file.utility';
import {BaseRoute} from '../routes/index';
import {MemberRepo} from "../repository/members.repository";
import {MembersEntity} from "../entities/members.entity";
import { getRepository } from 'typeorm';

export class MembersController extends BaseRoute {

    private memberRepo: MemberRepo = new MemberRepo();
    private file: any;

    constructor() {
        super();
        this._intializeRoutes();
        this.file = new File();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/members`, this.getAllMembers);
        this.router.post(`${this.path}/member/create`, this.createMember);
    }
 
    public getAllMembers = async (request: express.Request, response: express.Response) => {
        try {
            const members = await this.memberRepo.getAllMembers();

            response.json({
                data: members
            });
        } catch (err) {
            response.status(500).json(err);
        }
    }
 
    public createMember = async (request: express.Request & {files}, response: express.Response) => {
        try {
            let member: MembersEntity = new MembersEntity();
            const {email,firstName,lastName,telephone,role,image,twitterUrl,linkedinUrl,githubUrl} = request.body;
        
            member.email = email;
            member.firstName = firstName;
            member.lastName = lastName;
            member.telephone = telephone;
            member.role = role;
            member.twitterUrl = twitterUrl;
            member.linkedinUrl = linkedinUrl;
            member.githubUrl = githubUrl
            member.imageUrl = await this.file.cloudUpload(`${image}`, "ICA-Yabatech/")

            const payload = await this.memberRepo.saveMember(member);

            response.json({
                message: "Member created successfully",
                data: payload
            });
        } catch (err) {
            response.status(500).send(err);
        }
    }
};
