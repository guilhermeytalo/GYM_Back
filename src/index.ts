import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg"
import { pollConfig } from "./env/environment";

const app = express();
dotenv.config();

export const pool =  new Pool({  
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

const connectToDB = async () => {
  try {
    await pool.connect()
  } catch (err) {
    console.log(err);
  }
}

connectToDB();

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
