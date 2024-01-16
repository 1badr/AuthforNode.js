const { Router} = require('express');
const postCompany = require('../Controllers/Admin/AddCompany');
const router = Router();

router.post('/add_Company', AddCompany.postCompany);


module.exports = router