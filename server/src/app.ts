import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from "@/routes";
import {routeConfig} from "@/config/route.config";
import errorHandler from "@/middleware/errorHandler";

dotenv.config();

const app = express();
app.set('trust proxy', 1);

// 1. GLOBAL MIDDLEWARES
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 2. ROUTES
app.use(routeConfig.api, routes);

// 3. ERROR HANDLING
app.use(errorHandler);


export default app;