import { NextFunction, Request, Response } from "express";
import { BaseController } from "./baseController";
import UserService from "../services/userService";

class UserController extends BaseController {
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAll();
      this.sendSuccess(res, users);
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.findById(req.params.id);
      this.sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.create(req.body);
      this.sendSuccess(res, user, 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.update(req.params.id, req.body);
      this.sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await UserService.delete(req.params.id);
      this.sendSuccess(res, { message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
