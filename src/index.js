import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import applicationRouter from './routes/application.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/application', applicationRouter);

app.listen(port, 'localhost', () => {
    console.log(`the server is running at port ${port}`);

});
