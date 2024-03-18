const express = require('express');
const CVController = require('../../Controllers/Admin/CVController');
const router = express.Router();

router.delete('/delete/:id', CVController.deleteCV);
router.post('/create', CVController.postCV);
router.get('/allCvs', CVController.allCvs);
router.get('/getCVById/:id', CVController.getCVById);
router.get('/getUserCvs/:id', CVController.getUserCvs);
router.put('/ubdateCV/:id', CVController.updateCV);
router.get('/getCVUserById/:id', CVController.getCVUserById);

module.exports = router;

