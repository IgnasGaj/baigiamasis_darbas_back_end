import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true },
  username: { type: String, required: true },
  savedAnswers: { type: [String], required: true },
});

export default mongoose.model("User", userSchema);
