import express from 'express';
import { getProfile, login, register, updatePassword } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);

userRouter.get('/profile/:id', getProfile);
userRouter.put('/password/:id',updatePassword );

export default userRouter;