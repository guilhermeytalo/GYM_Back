
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../models/index';


const User = db.users;
const tokenList: any = {};

// Create a new user

export const signup = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: 1 * 21 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('user', JSON.stringify(user, null, 2));
      console.log(token);

      return res.status(201).send(user);
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        // console.log('user', JSON.stringify(user, null, 2));
        // console.log(token);
        
        let refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY!,  { expiresIn: `${process.env.TOKEN_LIFE!}`});

        const response = {
          "token": token,
          "refreshToken": refreshToken,
          "user": user,
        }

        tokenList[refreshToken] = response;
        console.log('é um token?', tokenList);
        return res.status(200).json(response);
      } else {
        return res.status(401).json({message: 'Authentication failed'});
      }
    } else {
      return res.status(401).json({message: 'Authentication failed'});
    }
  } catch (error) {
    console.log(error)
  }
};

// Refresh  token

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    console.log('postData', postData);

    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
      const user = {
        "id": postData.id,
        "email": postData.email,
        "userName": postData.userName,
      }

      const token = jwt.sign({id: user.id}, process.env.SECRET_KEY!, {expiresIn: `${process.env.TOKEN_LIFE!}`});

      const response = {
        "token": token,
      }

      tokenList[postData.refreshToken].token = token;
      res.status(200).json(response);;
    } else {
      res.status(404).send('Invalid request');
    }
  } catch (error) {
    console.log(error)
  }
};

// Delete User

export const deleteUser = async (req: Request, res: Response) => {
  // delete user by email
  try{
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if(user) {
      await User.destroy({
        where: {
          email: email,
        },
      });

      return res.status(200).send('User deleted');
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error)
  }
};