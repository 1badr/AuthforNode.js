const express = require('express');
const quizController = require('../Controllers/quizController');
const router = express.Router();

router.post('/createQuiz', quizController.createQuiz);
router.delete('/deleteQuizById', quizController.deleteQuizById);
router.get('/getAllQuizzes', quizController.getAllQuizzes);
router.get('/getQuizById', quizController.getQuizById);
router.get('/submitAnswer', quizController.submitAnswer);
router.put('/updateQuizById', quizController.updateQuizById);

module.exports = router;

