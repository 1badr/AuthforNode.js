const express = require('express');
const saveController = require('../Controllers/saveController');
const router = express.Router();

router.get('/getUserSaves', saveController.getUserSaves);

module.exports = router;

