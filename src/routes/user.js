import express from "express";
import { INSERT_USER, LOGIN_USER } from "../controllers/user.js";
import validate from "../middleware/validation.js";
import userRegisterSchema from "../schemas/UserRegisterSchema.js";
import userLoginSchema from "../schemas/UserLoginSchema.js";

const router = express.Router();

router.post("/register", validate(userRegisterSchema), INSERT_USER);

router.post("/login", validate(userLoginSchema), LOGIN_USER);

export default router;
