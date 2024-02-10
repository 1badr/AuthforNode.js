const express = require('express');
const commentConreoller = require('../Controllers/commentController');
const router = express.Router();

router.delete('/delete/:id', commentConreoller.deleteComment);
router.post('/add', commentConreoller.postComment);
router.get('/getArticleComments/:id', commentConreoller.getArticleComments);
router.get('/getUserComments/:id', commentConreoller.getUserComments);

module.exports = router;

