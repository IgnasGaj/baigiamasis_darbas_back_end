import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: { type: String, required: true },
  question_id: { type: String, required: true },
  answer_text: { type: String, required: true },
  gained_likes_number: { type: String, required: true },
  creationTime: { type: Date, required: true },
});

export default mongoose.model("Answer", schema);
