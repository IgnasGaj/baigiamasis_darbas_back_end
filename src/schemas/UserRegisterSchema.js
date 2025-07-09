import Joi from "joi";

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  savedAnswers: Joi.array().items(Joi.string()).required(),
});

export default userRegisterSchema;
