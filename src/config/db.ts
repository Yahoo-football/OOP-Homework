import mysql, { Pool } from "mysql2/promise";

class Database {
  static pool: Pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "test",
    waitForConnections: true,
    connectionLimit: 10,
  });
}

export default Database;
