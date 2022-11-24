import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routers/authRouter.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api", authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server started on`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
