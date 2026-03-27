import express from "express";
import {routeConfig} from "@/config/route.config";
import wheelRoutes from './wheels.route';
import raffleRoutes from './raffle.route';

const router = express.Router();

router.use(routeConfig.wheelRoute, wheelRoutes);
router.use(routeConfig.raffleRoute, raffleRoutes);

export default router;