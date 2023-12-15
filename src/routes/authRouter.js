import express from "express";
import {
  login,
  loginValidation,
  register,
  registerValidation,
} from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/login", loginValidation, login);
authRouter.post("/register", registerValidation, register);
