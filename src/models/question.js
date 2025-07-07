import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  question_text: { type: String, required: true },
  question_title: { type: String, required: true },
  creationTime: { type: Date, required: true },
});

export default mongoose.model("Question", schema);
