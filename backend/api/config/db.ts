import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const username: string = process.env.DB_USERNAME ?? "";
const password: string = process.env.DB_PASSWORD ?? "";

if (!username || !password) {
  throw new Error("DB_USERNAME and DB_PASSWORD must be provided.");
}

const db = new Sequelize("rick_and_morty", username, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default db;
