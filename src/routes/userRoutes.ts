import express from 'express';

import userAuth from '../middlewares/userAuth';
import { login, refreshToken, signup } from '../controllers/userController';

const router = express.Router();

router.post('/signup', userAuth, signup);

router.post('/login', login);

router.post('/refreshToken', login, refreshToken);

export default router;