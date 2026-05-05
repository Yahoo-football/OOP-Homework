import Database from "../config/db";
import { ResultSetHeader } from "mysql2";

class UserModel {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async index(): Promise<UserModel[]> {
    const [rows] = await Database.pool.query("SELECT * FROM users");
    return (rows as any[]).map(
      (row) => new UserModel(row.id, row.name, row.email)
    );
  }

  static async findById(id: number): Promise<UserModel | null> {
    const [rows] = await Database.pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    const user = (rows as any[])[0];
    return user ? new UserModel(user.id, user.name, user.email) : null;
  }

  static async create(name: string, email: string): Promise<UserModel> {
    const [result] = await Database.pool.query<ResultSetHeader>(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    return new UserModel(result.insertId, name, email);
  }

  static async update(id: number, name: string, email: string): Promise<UserModel | null> {
    const [result] = await Database.pool.query<ResultSetHeader>(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return new UserModel(id, name, email);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await Database.pool.query<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

export default UserModel;
