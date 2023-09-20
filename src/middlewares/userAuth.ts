import { NextFunction, Request, Response } from 'express';
import { User } from '../utils/database';

const saveUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userNameCheck = await User.findFirst({
      where: {
        userName: req.body.userName,
      },
    });

    if (userNameCheck) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const emailCheck = await User.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default saveUser;