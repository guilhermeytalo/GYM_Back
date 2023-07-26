import { NextFunction, Request, Response } from 'express';
import {db}  from '../models';


export const User = db.users;

const saveUser = async (req: Request,res: Response, next: NextFunction) => {
    try{
        const userName = await User.findOne({
            where: {
                userName: req.body.userName
            }
        });

        if(userName) {
            return res.status(400).json({message: "Username already taken"});
        }

        const emailCheck = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(emailCheck) {
            return res.status(400).json({message: "Email already taken"});
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default saveUser;