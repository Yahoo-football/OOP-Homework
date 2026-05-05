"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class UserModel {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    static async index() {
        const [rows] = await db_1.default.pool.query("SELECT * FROM users");
        return rows.map((row) => new UserModel(row.id, row.name, row.email));
    }
    static async findById(id) {
        const [rows] = await db_1.default.pool.query("SELECT * FROM users WHERE id = ?", [id]);
        const user = rows[0];
        return user ? new UserModel(user.id, user.name, user.email) : null;
    }
    static async create(name, email) {
        const [result] = await db_1.default.pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        return new UserModel(result.insertId, name, email);
    }
    static async update(id, name, email) {
        const [result] = await db_1.default.pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return new UserModel(id, name, email);
    }
    static async delete(id) {
        const [result] = await db_1.default.pool.query("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
exports.default = UserModel;
