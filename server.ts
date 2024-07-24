import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/userModel.js";
import scheduleEmail from "./utils/scheduler.js";
import mongoose from "mongoose";

const app: Application = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.create({ email });

    scheduleEmail(user.email);

    res.status(201).json({
      message:
        "User registered successfully and email will be sent in 10 minutes.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

mongoose.connect("mongodb://localhost:27017/rns").then(() => {
  console.log("db connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
