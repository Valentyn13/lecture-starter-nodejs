import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { createFighterController, getAllFightersController } from "../controllers/fighters.controller.js";

const router = Router();

router.get('/',getAllFightersController, responseMiddleware)
router.post('/',createFighterValid, createFighterController,responseMiddleware)

export { router };
