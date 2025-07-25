import UserModel from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const INSERT_USER = async (req, res) => {
  console.log(req.body);

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      ...req.body,
      id: uuidv4(),
      password: passwordHash,
    };

    const response = new UserModel(newUser);
    const data = await response.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", user: data });
  } catch (err) {
    const DUPLICATE_ERROR_CODE = 11000;

    if (err.code === DUPLICATE_ERROR_CODE) {
      return res.status(409).json({ message: "eMail adress is taken" });
    }

    return res.status(500).json({ message: "We are having issues" });
  }
};

export const LOGIN_USER = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      message: "Wrong email adress",
    });
  }

  const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Wrong Password",
    });
  }

  const token = jwt.sign(
    { userEmail: user.email, userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.status(200).json({
    message: "Login Successful",
    jwt: token,
    username: user.username,
  });
};
