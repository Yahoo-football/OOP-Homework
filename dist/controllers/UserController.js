"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
class UserController {
    static async getAllUsers(_req, res) {
        try {
            const users = await User_1.User.getAll();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: "Cannot get users", error });
        }
    }
    static async getUserById(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await User_1.User.getById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: "Cannot get user", error });
        }
    }
    static async createUser(req, res) {
        try {
            const { name, email } = req.body;
            const user = await User_1.User.create({ name, email });
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ message: "Cannot create user", error });
        }
    }
    static async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            const { name, email } = req.body;
            const user = await User_1.User.update(id, { name, email });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: "Cannot update user", error });
        }
    }
    static async deleteUser(req, res) {
        try {
            const id = Number(req.params.id);
            const deleted = await User_1.User.delete(id);
            if (!deleted) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json({ message: "Delete success" });
        }
        catch (error) {
            res.status(500).json({ message: "Cannot delete user", error });
        }
    }
}
exports.UserController = UserController;
