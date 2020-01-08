import * as express from 'express';

import {IMembers} from '../models/members.interface';
import {BaseRoute} from '../routes/index';


export class MembersController extends BaseRoute {
    
    // private posts: Post[] = [
    //     {
    //     author: 'Marcin',
    //     content: 'Dolor sit amet',
    //     title: 'Lorem Ipsum',
    //     }
    // ];
 
    constructor() {
        super();
        this._intializeRoutes();
    }
    
    public _intializeRoutes() {
        this.router.get(`${this.path}/members`, this.getAllMembers);
        this.router.post(`${this.path}/members/create`, this.createMember);
    }
 
    public getAllMembers(request: express.Request, response: express.Response) {
        response.json({message:"Hello World"});
    }
 
    public createMember(request: express.Request, response: express.Response) {
        const post: IMembers = request.body;
        // this.posts.push(post);
        response.send(post);
    }
};
