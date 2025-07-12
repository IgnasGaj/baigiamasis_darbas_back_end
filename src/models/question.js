import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question_text: { type: String, required: true },
  question_title: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Question", questionSchema);
