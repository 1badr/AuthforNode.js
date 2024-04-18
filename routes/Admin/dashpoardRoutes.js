const express = require('express');
const dashboardController = require('../../Controllers/Admin/dashboardController');
const router = express.Router();

router.get('/allUsers', dashboardController.allUsers);
router.get('/allCompany', dashboardController.allCompany);
router.get('/allJobs', dashboardController.allJobs);
router.get('/getUserGrowth', dashboardController.allJobsLastYear);
router.get('/getUserGrowth', dashboardController.allUserLastYear);
router.get('/getUserGrowth', dashboardController.allCompanyLastYear);
router.get('/allJobsLastMonth', dashboardController.allJobsLastMonth);
router.get('/allUserLastMonth', dashboardController.allUserLastMonth);
router.get('/allCompanyLastMonth', dashboardController.allCompanyLastMonth);

module.exports = router;

