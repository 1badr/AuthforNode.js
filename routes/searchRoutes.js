const express = require('express');
const searchController = require('../Controllers/searchController');
const router = express.Router();

router.get('/search', searchController.search);

module.exports = router;