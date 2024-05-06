const express = require('express');
const searchController = require('../Controllers/searchController');
const router = express.Router();

router.get('/search', searchController.search);
/** http://localhost:8000/search/search?q="حط اي حرف هنا, وتقدر تخليه فاضي كمان" */
router.get('/filterByDate', searchController.filterBlogsByUserType);
/**http://localhost:8000/search/filterByDate?q= */
router.get('/searchByLocation', searchController.searchByLocation);
router.get('/searchByGender', searchController.searchByGender);
router.get('/getUserByEducation', searchController.getUserByEducation);
router.get('/getTypeJobs', searchController.getTypeJobs);
router.get('/getJobsByEducation', searchController.getJobsByEducation);
router.get('/getFilteredJobs', searchController.getFilteredJobs);
router.get('/getCategoreyJobs', searchController.getCategoreyJobs);
router.get('/getworkScheduleJobs', searchController.getworkScheduleJobs);



module.exports = router;