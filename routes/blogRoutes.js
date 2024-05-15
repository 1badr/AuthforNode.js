const express = require('express');
const blogConreoller = require('../Controllers/blogController');
const router = express.Router();

router.delete('/delete/:id', blogConreoller.deleteblog);
router.post('/create', blogConreoller.postblog);
router.put('/ubdate/:id', blogConreoller.ubdateblog);
router.get('/getArticleById/:id', blogConreoller.getArticleById);
router.get('/getUserBlogs/:id', blogConreoller.getUserBlogs);
router.get('/getArticlesUserInLimit/:id', blogConreoller.getArticlesUserInLimit);
router.get('/getArticlesByCommunityId/:id', blogConreoller.getArticlesByCommunityId);



module.exports = router;

