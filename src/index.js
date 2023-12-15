import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcrypt";
import { authRouter } from "./routes/authRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "qwuqu1fbna",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRouter);

const URL = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.password
);
const PORT = process.env.PORT;

mongoose.connect(URL).catch((err) => console.log(`Db not connected - ${err}`));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
