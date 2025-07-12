import Joi from "joi";

const questionSchema = Joi.object({
  id: { type: String, required: true },
  userId: Joi.string().required(),
  question_text: Joi.string().min(5).required(),
  question_title: Joi.string().min(5).required(),
});

export default questionSchema;
