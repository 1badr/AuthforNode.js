const express = require('express');
const AddCompany = require('../../Controllers/Admin/AddCompany');
const router = express.Router();


router.post('/add_Company', AddCompany.postCompany);
router.post('/add_Employee', AddCompany.postEmployee);


module.exports = router;
