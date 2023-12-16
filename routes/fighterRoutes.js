import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { createFighterController, deletedFighterController, getAllFightersController, getFighterByIdController, updateFighterController } from "../controllers/fighters.controller.js";

const router = Router();

router.get('/',getAllFightersController, responseMiddleware)
router.get('/:id', getFighterByIdController,responseMiddleware)
router.post('/',createFighterValid, createFighterController,responseMiddleware)
router.put('/:id',updateFighterController,responseMiddleware)
router.delete('/:id',deletedFighterController,responseMiddleware)

export { router };
