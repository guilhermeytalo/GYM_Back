import express from 'express';

import userAuth from '../middlewares/userAuth'

const router = express.Router();

router.post('/signup', userAuth.saveUser, signup);

router.post('/login', login);

module.exports = router