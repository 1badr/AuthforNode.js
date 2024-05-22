const express = require('express');
const saveController = require('../Controllers/saveController');
const router = express.Router();

router.get('/getUserSaves/:id', saveController.getUserSaves);
router.post('/savePost', saveController.savePost);
router.get('/getBlogSaves/:id', saveController.getBlogSaves);

module.exports = router;

