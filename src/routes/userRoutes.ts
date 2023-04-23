import express from 'express';

import userAuth from '../middlewares/userAuth';
import { login, signup } from '../controllers/userController';

const router = express.Router();

router.post('/signup', userAuth, signup);

router.post('/login', login);

export default router;