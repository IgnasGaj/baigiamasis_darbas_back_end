import express from "express";
import { CREATE_ANSWER, DELETE_ANSWER } from "../controllers/answer.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import answerSchema from "../schemas/answerSchema.js";

const router = express.Router();

router.post("/", auth, validate(answerSchema), CREATE_ANSWER);
router.delete("/:answerId", auth, DELETE_ANSWER);

export default router;
