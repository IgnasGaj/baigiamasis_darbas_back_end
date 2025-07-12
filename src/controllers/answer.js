import AnswerModel from "../models/answer.js";
import UserModel from "../models/user.js";
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

export const GET_ANSWERS_FOR_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const answers = await AnswerModel.find({ question_id: questionId });

    const userIds = [...new Set(answers.map((a) => a.userId))];

    const users = await UserModel.find({ id: { $in: userIds } });

    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.username;
    });

    const answersWithUsernames = answers.map((answer) => ({
      ...answer._doc,
      username: userMap[answer.userId] || "Unknown",
    }));

    console.log("Answers with usernames:", answersWithUsernames);

    return res.status(200).json({ answers: answersWithUsernames });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while fetching answers",
    });
  }
};
