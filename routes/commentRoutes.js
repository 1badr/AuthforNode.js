const express = require('express');
const commentConreoller = require('../Controllers/commentController');
const router = express.Router();

router.delete('/delete/:id', commentConreoller.deleteComment);
router.post('/add', commentConreoller.postComment);

module.exports = router;

