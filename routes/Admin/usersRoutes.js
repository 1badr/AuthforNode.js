const express = require('express');
const usersControllers = require('../../Controllers/Admin/usersControllers');
const router = express.Router();

router.get('/allUsers', usersControllers.AllUsers);
router.delete('/deleteUsers/:id', usersControllers.deleteuser);
router.get('/getuser/:id', usersControllers.getuser);
router.get('/getAllCompanyByType', usersControllers.getAllCompanyByType);
router.get('/getAllEmployeeByType', usersControllers.getAllEmployeeByType);
router.get('/getAllUsersByType', usersControllers.getAllUsersByType);
router.put('/updateUser/:id', usersControllers.updateUser);
router.get('/myView/:name', usersControllers.myView);


module.exports = router;

