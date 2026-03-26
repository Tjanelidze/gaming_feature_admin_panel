import express from "express";
import * as wheelsController from "@/controllers/wheels.controller";
import {validate} from "@/middleware/validate.middleware";
import {createWheelSchema, updateWheelSchema} from "@/validators/wheels.validator";
import catchAsync from "@/utils/catchAsync";

const router = express.Router();

router.get('/', catchAsync(wheelsController.getAllWheels));
router.get('/:id', catchAsync(wheelsController.getWheel));
router.post('/', validate(createWheelSchema), catchAsync(wheelsController.createWheel));
router.patch('/:id', validate(updateWheelSchema), catchAsync(wheelsController.updateWheel));
router.delete('/:id', catchAsync(wheelsController.deleteWheel));

export default router;