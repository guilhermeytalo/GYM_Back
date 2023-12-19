import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { prisma } from './utils/database';
import userRoutes from './routes/userRoutes';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
});

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

// This function ensures that the Prisma Client disconnects when the Node.js process exits.
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
