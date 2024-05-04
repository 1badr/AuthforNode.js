const express = require('express');
const CompanyController = require('../Controllers/CompanyController');
const router = express.Router();

router.get('/getTopFollowedCompanies', CompanyController.getTopFollowedCompanies);
router.get('/getCompanyJobs/:id', CompanyController.getCompanyJobs);


module.exports = router;

