import mysql from "mysql2/promise";
import { config } from "../config/config.js";

export const connectDB = async () => {
  return await mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  });
};
