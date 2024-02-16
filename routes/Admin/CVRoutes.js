const express = require('express');
const CVController = require('../../Controllers/Admin/CVController');
const router = express.Router();

router.delete('/delete/:id', CVController.deleteCV);
router.post('/create', CVController.postCV);
router.get('/allCvs', CVController.allCvs);
router.get('/getCVById', CVController.getCVById);
router.get('/getUserCvs', CVController.getUserCvs);

module.exports = router;

