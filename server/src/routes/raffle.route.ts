import express from "express";
import catchAsync from "@/utils/catchAsync";
import * as raffleController from '@/controllers/raffle.controller';
import {validate} from "@/middleware/validate.middleware";
import {createRaffleSchema, updateRaffleSchema} from "@/validators/raffle.validator";

const router = express.Router();

router.get('/', catchAsync(raffleController.getAllRaffles));
router.post('/', validate(createRaffleSchema), catchAsync(raffleController.createRaffle));
router.get('/:id', catchAsync(raffleController.getRaffle));
router.patch('/:id', validate(updateRaffleSchema), catchAsync(raffleController.updateRaffle));
router.delete('/:id', catchAsync(raffleController.deleteRaffle));

export default router;