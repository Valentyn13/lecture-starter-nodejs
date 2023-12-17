import { Router } from "express";
import {
  createUserValid,
  isUserExist,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { deletedUserController, getAllUsersController, getUserByIdController, signUpController, updateUserController } from "../controllers/user.controllers.js";

const router = Router();

router.post('/',createUserValid, signUpController)
router.get('/',getAllUsersController)
router.put('/:id',isUserExist, updateUserValid, updateUserController)
router.delete('/:id',isUserExist, deletedUserController)
router.get('/:id',isUserExist, getUserByIdController)

export { router };
