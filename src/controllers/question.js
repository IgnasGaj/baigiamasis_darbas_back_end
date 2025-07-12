import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";

export const CREATE_QUESTION = async (req, res) => {
  try {
    const question = {
      id: uuidv4(),
      question_title: req.body.question_title,
      question_text: req.body.question_text,
      userId: req.body.userId,
      createdAt: new Date(),
    };

    const response = new QuestionModel(question);
    const data = await response.save();

    return res.status(201).json({
      message: "Question was created",
      question: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: " Unexpected Error",
    });
  }
};

export const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await QuestionModel.findOne({ id }).populate(
      "userId",
      "username"
    );

    if (!question) {
      return res.status(404).json({
        message: `Question with id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Question fetched successfully",
      question: {
        id: question.id,
        question_title: question.question_title,
        question_text: question.question_text,
        createdAt: question.createdAt,
        username: question.userId?.username || "Unknown",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while fetching the question",
    });
  }
};

export const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await QuestionModel.findOneAndDelete({ id });

    if (!question) {
      return res.status(404).json({
        message: `Question id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Question was deleted",
      question,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while deleting question",
    });
  }
};

export const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find()
      .select("-__v")
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      question_title: q.question_title,
      question_text: q.question_text,
      createdAt: q.createdAt,
      username: q.userId?.username || "Unknown",
    }));

    return res.status(200).json({ questions: formattedQuestions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while fetching questions",
    });
  }
};

//EXPERIMENTAL

export const GET_FILTERED_QUESTIONS = async (req, res) => {
  try {
    const { answered } = req.query;
    const answeredQuestionIds = await AnswerModel.distinct("questionId");

    let filter = {};
    if (answered === "true") {
      filter.id = { $in: answeredQuestionIds };
    } else if (answered === "false") {
      filter.id = { $nin: answeredQuestionIds };
    }

    const questions = await QuestionModel.find(filter).select("-__v");

    return res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while trying to filter questions",
    });
  }
};
