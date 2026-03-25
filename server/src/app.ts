import express from 'express';
import dotenv from 'dotenv';
import routes from "@/routes";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.set('trust proxy', 1);

// 1. GLOBAL MIDDLEWARES
app.use(express.json());

// 2. ROUTES
app.use('/api/v1', routes);


export default app;