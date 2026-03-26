import express from "express";
import {routeConfig} from "@/config/route.config";
import wheelsRoutes from './wheels.route';

const router = express.Router();

router.use(routeConfig.wheelRoute, wheelsRoutes);

export default router;