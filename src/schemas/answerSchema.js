import Joi from "joi";

const answerSchema = Joi.object({
  answer_text: Joi.string().min(5).required(),
  userId: Joi.string().required(),
});

export default answerSchema;
