const express = require('express');
const likeController = require('../Controllers/likeController');
const router = express.Router();

router.post('/likePost', likeController.likePost);
/*http://localhost:8000/like/likePost
{
    "userId":"662e63a31859045f23a1cb17",
    "postId":"65c5ff33309387466defdd75"
  }*/


router.get('/getUserLikes/:id', likeController.getUserLikes);
/**http://localhost:8000/like/getUserLikes/هنا حط الايدي */

router.get('/getBlogLikes/:id', likeController.getBlogLikes);
http://localhost:8000/like/getBlogLikes/هنا حط الايدي


router.post('/checkIfUserLikes', likeController.checkIfUserLikes);
/**
 * http://localhost:8000/like/checkIfUserLikes
 * 
 * {
  "likerUserID":"662e63a31859045f23a1cb17",
  "likedUserID":"65c5ff33309387466defdd75"
}
 */
module.exports = router;

