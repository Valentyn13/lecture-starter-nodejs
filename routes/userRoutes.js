import { Router } from "express";
// import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { signUpController } from "../controllers/user.controllers.js";

const router = Router();

// TODO: Implement route controllers for user

router.post('/',signUpController,responseMiddleware)
export { router };
