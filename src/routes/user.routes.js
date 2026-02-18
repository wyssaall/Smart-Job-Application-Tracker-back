import express from 'express';
import { getProfile, login, register, updatePassword } from '../controllers/user.controller.js';
import protect from '../middlewares/protect.js';
import { registerValidator, loginValidator } from '../validators/validator.js';

const userRouter = express.Router();

userRouter.post('/login', loginValidator, login);
userRouter.post('/register', registerValidator, register);

userRouter.get('/profile/:id', protect, getProfile);
userRouter.put('/password/:id', protect, updatePassword);

export default userRouter;