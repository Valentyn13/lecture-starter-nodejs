import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { getAllFightersController } from "../controllers/fighters.controller.js";

const router = Router();

router.get('/',getAllFightersController, responseMiddleware)


export { router };
