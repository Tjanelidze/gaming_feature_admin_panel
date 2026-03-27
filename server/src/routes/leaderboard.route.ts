import express from "express";
import catchAsync from "@/utils/catchAsync";
import * as leaderboardController from '@/controllers/leaderboard.controller';
import {validate} from "@/middleware/validate.middleware";
import {createLeaderboardSchema, updateLeaderboardSchema} from "@/validators/leaderboard.validator";

const router = express.Router();

router.get('/', catchAsync(leaderboardController.getLeaderboards));
router.post('/', validate(createLeaderboardSchema), catchAsync(leaderboardController.createLeaderboard));
router.patch('/bulk-status', catchAsync(leaderboardController.bulkUpdateStatus));
router.get('/:id', catchAsync(leaderboardController.getLeaderboard));
router.patch('/:id', validate(updateLeaderboardSchema), catchAsync(leaderboardController.updateLeaderboard));
router.delete('/:id', catchAsync(leaderboardController.deleteLeaderboard));

export default router;