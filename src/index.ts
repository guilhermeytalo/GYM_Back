import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg"
import cookieParser from "cookie-parser";
import userRoutes  from './routes/userRoutes'
import { DataTypes, Sequelize } from 'sequelize';
const app = express();
dotenv.config();

export const pool = new Pool({
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

const sequelize = new Sequelize(`postgres://postgres:123456@localhost:5432/discover`, {dialect: "postgres"});

sequelize.authenticate().then(() => {
  console.log(`Database connected to discovery`);
}).catch((err) => {
  console.log(`Sequelize auth ${err}`);
});

export const db = {
  Sequelize, 
  sequelize,
  users: require("./models/userModel")(sequelize, DataTypes),
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./models/userModel")(sequelize, DataTypes);

connectToDB();


//midldleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users/login', userRoutes);

app.use('/api/users/signup', userRoutes);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
