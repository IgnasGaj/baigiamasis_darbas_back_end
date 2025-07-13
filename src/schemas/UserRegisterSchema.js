import Joi from "joi";

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(2).required(),
});

export default userRegisterSchema;
