import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type", "Authorization"]
}));

// Routes
import user from './router/user.route.js';
import home from './router/home.route.js';

app.use("/api/v1/auth", user);
app.use("/api/v1/data", home);

// Serve frontend build
app.use(express.static(path.join(__dirname, '/Frontend/dist')));

app.use( (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.startsWith('/api')) {
    return next();
  }
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});


export { app };
