const Quizes = require('../models/quiz');

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quizes.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

const createQuiz = async (req, res) => {
  try {
    const newQuiz = await Quizes.create(req.body);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quizes.findById(req.params.id);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

const updateQuizById = async (req, res) => {
  try {
    const updatedQuiz = await Quizes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

const deleteQuizById = async (req, res) => {
  try {
    await Quizes.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

const submitAnswer = async (req, res) => {
    try {
      const { quizId, questionId, answer } = req.body;
      const quiz = await Quizes.findById(quizId);
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      const question = quiz.questions.find((q) => q._id.toString() === questionId);
  
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      const isAnswerCorrect = question.answer === answer;
      const correctAnswer = question.answers[question.answer - 1].option;
  
      res.status(200).json({ isAnswerCorrect, correctAnswer });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit answer' });
    }
  };
  
  module.exports = {
    getAllQuizzes,
    createQuiz,
    getQuizById,
    updateQuizById,
    deleteQuizById,
    submitAnswer,
  };



