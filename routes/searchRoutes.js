const express = require('express');
const searchController = require('../Controllers/searchController');
const router = express.Router();

router.get('/search', searchController.search);
router.get('/filterByDate', searchController.filterBlogsByUserType);
router.get('/searchByLocation', searchController.searchByLocation);
router.get('/searchByGender', searchController.searchByGender);
router.get('/getUserByEducation', searchController.getUserByEducation);
router.get('/getTypeJobs', searchController.getTypeJobs);
router.get('/getJobsByEducation', searchController.getJobsByEducation);
router.get('/getFilteredJobs', searchController.getFilteredJobs);
router.get('/getCategoreyJobs', searchController.getCategoreyJobs);
router.get('/getworkScheduleJobs', searchController.getworkScheduleJobs);



module.exports = router;