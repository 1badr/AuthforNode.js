const { restart } = require('nodemon');
const Jobs = require ('../models/Jobs');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');
const Requests = require('../models/Requests')

const postJobs = async (req, res) => {
    const job = new Jobs (req.body);
    job.save()
      .then((result) => {
        res.status(201).json({ job: job._id });
      });
  };

  
const deleteJobs = (req,res) => {
  const id = req.params.id ;

  job.findByIdAndDelete(id)
  .then(result => {
    res.status(201).json();
  })
  .catch(err => {
    console.log(err);
  })
};

const allJobs = async (req, res) => {
   try {
    const jobs = await Jobs.find();
    const reversedJobs = Jobs.reverse();
    res.json(reversedJobs);
   } catch (error) {
    res.status(412).json({error})
   }
};


const getAllRequestsJobs = async (req, res) => {
  const jobId = req.params.id;

  try {
    const requests = await Requests.find({ userId })
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateJob = async (req, res) => {
  const jobId = req.params.Id;
  const updatedJob = req.body;

  try {
    const result = await Jobs.findOneAndUpdate({ _id: jobId }, updatedJob, { new: true });
    res.status(201).json(result);
  } catch (error) {
    res.status(412).json({ msg: error.message });
  }
};





const getLatestJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find()
      .sort({ createdAt: -1 })
      .limit(10);

      let jobSummary = '';
      if (jobs.bio) {
        jobSummary = jobs.bio.substring(300);
      }
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getJobById = async (req, res) => {
  const JobId = req.params.id;

  try {
    const job = await Jobs.findOne({ _id: JobId });

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};


module.exports = {
    deleteJobs,
    postJobs,
    allJobs,
    updateJob,
    getAllRequestsJobs,
    getLatestJobs,
    getJobById
}

