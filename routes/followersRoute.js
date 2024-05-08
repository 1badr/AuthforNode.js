const express = require('express');
const followersController = require('../Controllers/followersController');
const router = express.Router();

router.post('/follower', followersController.followUser);
/**
 * {
  "userId":"662fb3e4a5a76f34a336d59e",
  "targetUserId":"663a2346d93ea6c9e51ea394"
}
http://localhost:8000/follo/follower
 */
router.get('/getUserFollowers/:id', followersController.getUserFollowers);// ذا مايشتغل 
router.post('/unFollowUser', followersController.unFollowUser);
/**http://localhost:8000/follo/unFollowUser  
 * {
  "userId":"662fb3e4a5a76f34a336d59e",
  "targetUserId":"663a2346d93ea6c9e51ea394"
}
*/

module.exports = router;

