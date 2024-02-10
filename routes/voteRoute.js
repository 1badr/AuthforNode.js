const express = require('express');
const voteController = require('../Controllers/voteController');
const router = express.Router();

router.post('/addVoteBlogs', voteController.addVoteBlogs);
router.post('/addVoteComments', voteController.addVoteComments);



module.exports = router;

