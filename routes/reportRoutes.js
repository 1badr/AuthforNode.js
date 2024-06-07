const express = require('express');
const reportController = require('../Controllers/reportController');
const router = express.Router();

router.post('/createReport', reportController.createReport);
router.get('/getUserReports/:id', reportController.getUserReports);
router.get('/getReports', reportController.getReports);
router.get('/getTrueReports', reportController.getTrueReports);
router.get('/getFalseReports', reportController.getFalseReports);



module.exports = router;

