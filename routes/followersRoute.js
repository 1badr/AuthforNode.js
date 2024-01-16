const express = require('express');
const followersController = require('../Controllers/followersController');
const router = express.Router();

router.post('/follower', followersController.followUser);


module.exports = router;

