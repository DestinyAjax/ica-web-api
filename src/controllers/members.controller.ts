import * as express from 'express';
import File from '../utils/file.utility';
import {BaseRoute} from '../routes/index';
import {MemberRepo} from "../repository/members.repository";
import {MembersEntity} from "../entities/members.entity";
import BaseService from "../services/base.service";

export class MembersController extends BaseRoute {

    private memberRepo: MemberRepo = new MemberRepo();
    private file: any;
    private service: any;

    constructor() {
        super();
        this._intializeRoutes();
        this.file = new File();
        this.service = new BaseService();
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
            member.imageUrl = await this.file.cloudUpload(`${image}`, "ICA-Yabatech/");
            member.isActive = false;
            const payload = await this.memberRepo.saveMember(member);

            this.service.Email(payload, 'New Member Registration', 
                this.service.html('<p style="color: #000">Hello ' + payload.firstName + ' ' + payload.lastName + ', Thank you for registering as a member in our community. <br/><br/>We will get back to you shortly.</p>'));

            response.json({
                message: "Member created successfully",
                data: payload
            });
        } catch (err) {
            response.status(500).send(err);
        }
    }
};
