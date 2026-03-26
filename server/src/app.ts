import express from 'express';
import dotenv from 'dotenv';
import routes from "@/routes";
import {routeConfig} from "@/config/route.config";
import errorHandler from "@/middleware/errorHandler";

dotenv.config();

const app = express();
app.set('trust proxy', 1);

// 1. GLOBAL MIDDLEWARES
app.use(express.json());

// 2. ROUTES
app.use(routeConfig.api, routes);

// 3. ERROR HANDLING
app.use(errorHandler);


export default app;