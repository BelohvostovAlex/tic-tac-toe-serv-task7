import { Router } from "express";
import { check } from "express-validator";

import authController from "../controllers/authController.js";

const router = new Router();

router.post(
  "/login",
  [check("username", "Username cant be empty").notEmpty()],
  authController.login
);

export default router;
