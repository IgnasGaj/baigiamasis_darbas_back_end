import Joi from "joi";

const answerSchema = Joi.object({
  id: Joi.string().required(),
  question_id: Joi.string().required(),
  answer_text: Joi.string().min(5).required(),
  gained_likes_number: Joi.string().required(),
  creationTime: Joi.date().required(),
});

export default answerSchema;
