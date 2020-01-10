"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../routes/index");
class MembersController extends index_1.BaseRoute {
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
    _intializeRoutes() {
        this.router.get(`${this.path}/members`, this.getAllMembers);
        this.router.post(`${this.path}/members/create`, this.createMember);
    }
    getAllMembers(request, response) {
        response.json({ message: "Hello World" });
    }
    createMember(request, response) {
        const post = request.body;
        // this.posts.push(post);
        response.send(post);
    }
}
exports.MembersController = MembersController;
;
//# sourceMappingURL=members.controller.js.map