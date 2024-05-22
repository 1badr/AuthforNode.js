const express = require('express');
const searchController = require('../Controllers/searchController');
const router = express.Router();

router.get('/search', searchController.search);
/** http://localhost:8000/search/search?q="حط اي حرف هنا, وتقدر تخليه فاضي كمان" */
router.get('/filterByDate', searchController.filterBlogsByUserType);
/**http://localhost:8000/search/filterByDate?q= */
router.post('/filterJobs', searchController.filterJobs);


module.exports = router;