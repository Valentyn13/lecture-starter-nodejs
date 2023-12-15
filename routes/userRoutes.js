import { Router } from "express";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { deletedUserController, getAllUsersController, getUserById, signUpController, updateUserController } from "../controllers/user.controllers.js";

const router = Router();

router.post('/',createUserValid, signUpController, responseMiddleware)
router.get('/',getAllUsersController,responseMiddleware)
router.put('/:id',updateUserController,responseMiddleware)
router.delete('/:id', deletedUserController,responseMiddleware)
router.get('/:id',getUserById,responseMiddleware)
export { router };
