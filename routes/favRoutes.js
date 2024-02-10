const express = require('express');
const favController = require('../Controllers/favController');
const router = express.Router();

router.post('/toggleFavorite', favController.toggleFavorite);

module.exports = router;

