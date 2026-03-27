import express from "express";
import * as wheelsController from "@/controllers/wheel.controller";
import {validate} from "@/middleware/validate.middleware";
import {createWheelSchema, updateWheelSchema} from "@/validators/wheel.validator";
import catchAsync from "@/utils/catchAsync";

const router = express.Router();

router.get('/', catchAsync(wheelsController.getAllWheels));
router.post('/', validate(createWheelSchema), catchAsync(wheelsController.createWheel));
router.get('/:id', catchAsync(wheelsController.getWheel));
router.patch('/:id', validate(updateWheelSchema), catchAsync(wheelsController.updateWheel));
router.delete('/:id', catchAsync(wheelsController.deleteWheel));

export default router;