import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import AnswerModel from "../models/answer.js";

export const CREATE_QUESTION = async (req, res) => {
  try {
    const question = {
      ...req.body,
      id: uuidv4(),
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
    const questions = await QuestionModel.find().select("-__v");

    return res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while fetching questions",
    });
  }
};

export const GET_ANSWERS_FOR_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const answers = await AnswerModel.find({ question_id: questionId });

    return res.status(200).json({ answers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error while fetching answers",
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
