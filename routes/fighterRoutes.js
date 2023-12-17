import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  isFighterExist,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { createFighterController, deletedFighterController, getAllFightersController, getFighterByIdController, updateFighterController } from "../controllers/fighters.controller.js";

const router = Router();

router.get('/',getAllFightersController)
router.get('/:id',isFighterExist,getFighterByIdController)
router.post('/',createFighterValid,createFighterController)
router.put('/:id',isFighterExist,updateFighterValid,updateFighterController)
router.delete('/:id',isFighterExist,deletedFighterController)

export { router };
