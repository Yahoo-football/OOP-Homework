import { ResultSetHeader, RowDataPacket } from "mysql2";
import Database from "../config/db";

export interface UserData {
  id?: number;
  name: string;
  email: string;
}

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
}

export class User {
  id?: number;
  name: string;
  email: string;

  constructor({ id, name, email }: UserData) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async getAll(): Promise<User[]> {
    const [rows] = await Database.pool.query<UserRow[]>("SELECT * FROM users");

    return rows.map(({ id, name, email }) => new User({ id, name, email }));
  }

  static async getById(id: number): Promise<User | null> {
    const [rows] = await Database.pool.query<UserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

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

  static async create(userData: UserData): Promise<User> {
    const { name, email } = userData;

    const [result] = await Database.pool.execute<ResultSetHeader>(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    return new User({
      id: result.insertId,
      name,
      email,
    });
  }

  static async update(id: number, userData: UserData): Promise<User | null> {
    const { name, email } = userData;

    const [result] = await Database.pool.execute<ResultSetHeader>(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return new User({ id, name, email });
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await Database.pool.execute<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}
