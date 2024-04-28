const express = require('express');
const jobsController = require('../../Controllers/jobsController');
const router = express.Router();

router.delete('/delete/:id', jobsController.deleteJobs);
router.post('/create', jobsController.postJobs);
router.get('/all-jobs', jobsController.allJobs);
router.put('/updateJob/:id', jobsController.updateJobs);
router.get('/getAllRequestsJobs/:id', jobsController.getAllRequestsJobs);
router.get('/getLatestJobs', jobsController.getLatestJobs);
router.get('/getJobById/:id', jobsController.getJobById);

module.exports = router;

