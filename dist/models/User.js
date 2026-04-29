"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = __importDefault(require("../config/db"));
class User {
    constructor({ id, name, email }) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    static async getAll() {
        const [rows] = await db_1.default.pool.query("SELECT * FROM users");
        return rows.map(({ id, name, email }) => new User({ id, name, email }));
    }
    static async getById(id) {
        const [rows] = await db_1.default.pool.query("SELECT * FROM users WHERE id = ?", [id]);
        const [user] = rows;
        if (!user) {
            return null;
        }
        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    static async create(userData) {
        const { name, email } = userData;
        const [result] = await db_1.default.pool.execute("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
        return new User({
            id: result.insertId,
            name,
            email,
        });
    }
    static async update(id, userData) {
        const { name, email } = userData;
        const [result] = await db_1.default.pool.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return new User({ id, name, email });
    }
    static async delete(id) {
        const [result] = await db_1.default.pool.execute("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
exports.User = User;
