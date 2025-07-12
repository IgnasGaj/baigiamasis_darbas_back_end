import express from "express";
import {
  CREATE_ANSWER,
  DELETE_ANSWER,
  GET_ANSWERS_FOR_QUESTION,
} from "../controllers/answer.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import answerSchema from "../schemas/answerSchema.js";

const router = express.Router();

router.post("/:id/answers", auth, validate(answerSchema), CREATE_ANSWER);
router.delete("/:answerId", auth, DELETE_ANSWER);
router.get("/question/:id", GET_ANSWERS_FOR_QUESTION);

export default router;
