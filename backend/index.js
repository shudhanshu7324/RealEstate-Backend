import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your development frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include other headers as needed
    credentials: true,
  }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter)

// custom middleware for error
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

