import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import { Users } from "../models/userModel.js";
import { createError } from "../utils/error.js";
import { check } from "express-validator";
import { validationResult } from 'express-validator';

export const loginValidation = [
  check("username").notEmpty().withMessage("Username is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.userId = user._id;
      res.status(200).json({ message: "User sign in" });
    } else {
      next(createError(404, "User Not Found"));
    }
  } catch (error) {
    next(error);
  }
};

export const registerValidation = [
    check("username").notEmpty().withMessage("Username is required"),
    check("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  ];
  

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Users({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: "User sign in" });
  } catch (error) {
    next(error);
  }
};
