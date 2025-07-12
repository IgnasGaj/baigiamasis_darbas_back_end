import express from "express";
import {
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
  GET_ALL_QUESTIONS,
  GET_FILTERED_QUESTIONS,
  GET_QUESTION_BY_ID,
} from "../controllers/question.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import questionSchema from "../schemas/questionSchema.js";

const router = express.Router();

router.post("/", auth, validate(questionSchema), CREATE_QUESTION);
router.get("/:id", GET_QUESTION_BY_ID);
router.delete("/:id", auth, DELETE_QUESTION_BY_ID);
router.get("/", GET_ALL_QUESTIONS);
router.get("/filter", GET_FILTERED_QUESTIONS);

export default router;
