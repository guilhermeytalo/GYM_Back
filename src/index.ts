import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const cors = require('cors');
const app = express();
dotenv.config();
import userRoutes from './routes/userRoutes';
import { sequelize } from './models';

const connectToDB = async () => {
  await sequelize
    .authenticate()
    .then((res: any) => {
      console.log(`Database connected to discovery ${res}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

connectToDB();

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', userRoutes);

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
