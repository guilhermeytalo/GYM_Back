import { NextFunction, Request, Response } from 'express';
import { db } from '../index';

export const User = db.users;

const saveUser = async (req: Request,res: Response, next: NextFunction) => {
    console.log('tem aqui?')
    try{
        const userName = await User.findOne({
            where: {
                userName: req.body.userName
            }
        });

        if(userName) {
            return res.json(409).send("Username already taken");
        }

        const emailCheck = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(emailCheck) {
            return res.json(409).send("Email already taken");
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default saveUser;