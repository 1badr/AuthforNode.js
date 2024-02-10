const express = require('express');
const CompanyController = require('../Controllers/CompanyController');
const router = express.Router();

router.get('/getTopFollowedCompanies', CompanyController.getTopFollowedCompanies);


module.exports = router;

