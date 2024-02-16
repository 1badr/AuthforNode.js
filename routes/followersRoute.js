const express = require('express');
const followersController = require('../Controllers/followersController');
const router = express.Router();

router.post('/follower', followersController.followUser);
router.get('/getUserFollowers/:id', followersController.getUserFollowers);
router.post('/unFollowUser', followersController.unFollowUser);


module.exports = router;

