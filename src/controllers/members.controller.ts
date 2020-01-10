import * as express from 'express';

import {IMembers} from '../models/interfaces/members.interface';
import {BaseRoute} from '../routes/index';
import memberModel from '../models/members.model';


export class MembersController extends BaseRoute {
 
    constructor() {
        super();
        this._intializeRoutes();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/members`, this.getAllMembers);
        this.router.post(`${this.path}/members/create`, this.createMember);
    }
 
    public getAllMembers = async (request: express.Request, response: express.Response) => {
        try {
            const members = await memberModel.find().exec();

            response.json({
                data: members
            });
        } catch (err) {
            response.status(500).json(err);
        }
    }
 
    public createMember = async (request: express.Request, response: express.Response) => {
        try {
            const memberData: IMembers = request.body;
            const createdMember = new memberModel(memberData);
            const payload = await createdMember.save();

            response.json({
                message: "Member created successfully",
                data: payload
            });
        } catch (err) {
            response.status(500).json(err);
        }
    }
};
