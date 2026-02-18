import express from 'express';
import { getProfile, login, register, updatePassword } from '../controllers/user.controller.js';
import protect from '../middlewares/protect.js';

const userRouter = express.Router();
//userRouter.use(protect);
userRouter.post('/login', login);
userRouter.post('/register', register);

userRouter.get('/profile/:id',protect, getProfile);
userRouter.put('/password/:id',protect, updatePassword );

export default userRouter;