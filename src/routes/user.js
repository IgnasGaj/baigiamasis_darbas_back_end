import express from "express";
import {
  INSERT_USER,
  LOGIN_USER,
  SAVE_ANSWER_TO_USER,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validation.js";
import userRegisterSchema from "../schemas/UserRegisterSchema.js";
import userLoginSchema from "../schemas/UserLoginSchema.js";

const router = express.Router();

router.post("/register", validate(userLoginSchema), INSERT_USER);
router.post("/login", validate(userRegisterSchema), LOGIN_USER);
router.post("/save-answer", auth, SAVE_ANSWER_TO_USER);

export default router;
