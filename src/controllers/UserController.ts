import { Request, Response } from "express";
import { User } from "../models/User";

export class UserController {
  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Cannot get users", error });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await User.getById(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Cannot get user", error });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await User.create({ name, email });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Cannot create user", error });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      const user = await User.update(id, { name, email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Cannot update user", error });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await User.delete(id);

      if (!deleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({ message: "Delete success" });
    } catch (error) {
      res.status(500).json({ message: "Cannot delete user", error });
    }
  }
}
