const express = require('express');
const jobsController = require('../../Controllers/jobsController');
const router = express.Router();

router.delete('/delete/:id', jobsController.deleteJobs);
router.post('/create', jobsController.postJobs);
router.get('/all-jobs', jobsController.allJobs);
router.put('/updateJob/:id', jobsController.updateJob);

module.exports = router;

