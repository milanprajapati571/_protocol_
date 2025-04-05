import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

import authroutes from './routes/auth.route.js'

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.use('/auth',authroutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));