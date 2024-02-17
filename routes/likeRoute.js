const express = require('express');
const likeController = require('../Controllers/likeController');
const router = express.Router();

router.post('/likePost', likeController.likePost);
router.get('/getUserLikes/:id', likeController.getUserLikes);
router.get('/getBlogLikes/:id', likeController.getBlogLikes);



module.exports = router;

