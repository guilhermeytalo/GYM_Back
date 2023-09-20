import express from 'express';

import userAuth from '../middlewares/userAuth';
import { deleteUser, login, refreshToken, showAllUsers, signup } from '../controllers/userController';

const router = express.Router();

router.post('/signup', userAuth, signup);

router.post('/login', login);

router.post('/refreshToken', login, refreshToken);

router.delete('/deleteUser', deleteUser);

router.get('/showUsers', showAllUsers);


export default router;