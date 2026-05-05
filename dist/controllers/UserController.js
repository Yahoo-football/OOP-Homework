"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = require("./baseController");
const userService_1 = __importDefault(require("../services/userService"));
class UserController extends baseController_1.BaseController {
    async getAll(_req, res, next) {
        try {
            const users = await userService_1.default.getAll();
            this.sendSuccess(res, users);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const user = await userService_1.default.findById(req.params.id);
            this.sendSuccess(res, user);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const user = await userService_1.default.create(req.body);
            this.sendSuccess(res, user, 201);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const user = await userService_1.default.update(req.params.id, req.body);
            this.sendSuccess(res, user);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await userService_1.default.delete(req.params.id);
            this.sendSuccess(res, { message: "User deleted" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController();
