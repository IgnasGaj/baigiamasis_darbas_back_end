// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./src/routes/user.js";
import questionRouter from "./src/routes/question.js";
import answerRouter from "./src/routes/answer.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(console.log("Connected to DB!"))
  .catch((err) => {
    console.log("Error connecting to DB:", err);
  });

app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/answers", answerRouter);

app.use((_req, res) => {
  return res.status(404).json({
    message: "This endpoint does not exist",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
