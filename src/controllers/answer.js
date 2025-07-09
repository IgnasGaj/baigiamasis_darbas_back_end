import AnswerModel from "../models/answer.js";
import { v4 as uuidv4 } from "uuid";

export const CREATE_ANSWER = async (req, res) => {
  try {
    const answer = {
      ...req.body,
      id: uuidv4(),
      question_id: req.params.id,
      gained_likes_number: "0",
      createdAt: new Date(),
      userId: req.body.userId,
    };

    const response = new AnswerModel(answer);
    const data = await response.save();

    return res.status(201).json({
      message: "Answer was created",
      answer: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "We have some problems creating the answer",
    });
  }
};

export const DELETE_ANSWER = async (req, res) => {
  try {
    const { answerId } = req.params;

    const deleted = await AnswerModel.findOneAndDelete({ id: answerId });

    if (!deleted) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json({ message: "Answer deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "We have some problems deleting the answer",
    });
  }
};
