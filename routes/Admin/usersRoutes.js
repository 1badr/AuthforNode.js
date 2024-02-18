const express = require('express');
const usersControllers = require('../../Controllers/Admin/usersControllers');
const router = express.Router();

router.get('/allUsers', usersControllers.AllUsers);
router.delete('/deleteUsers/:id', usersControllers.deleteuser);
router.get('/getuser/:id', usersControllers.getuser);
router.put('/updateUser/:id', usersControllers.updateUser);


module.exports = router;

