const express = require('express');
const voteController = require('../Controllers/voteController');
const router = express.Router();

router.post('/vote', voteController.addVote);



module.exports = router;

