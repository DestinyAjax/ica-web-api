"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseRoute {
    constructor() {
        this.path = '/api/v1';
        this.router = express.Router();
        this._initializeRoutes();
    }
    ;
    _initializeRoutes() {
        this.router.get(`${this.path}/`, this.index);
    }
    index(request, response) {
        response.json({
            message: "Welcome to ICA Yabatech API"
        });
    }
}
exports.BaseRoute = BaseRoute;
;
//# sourceMappingURL=index.js.map