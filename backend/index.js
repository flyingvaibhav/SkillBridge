import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';


dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connectDb();
});