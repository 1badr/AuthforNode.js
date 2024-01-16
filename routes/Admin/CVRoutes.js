const express = require('express');
const CVController = require('../../Controllers/Admin/CVController');
const router = express.Router();

router.delete('/delete/:id', CVController.deleteCV);
router.post('/create', CVController.postCV);

module.exports = router;

