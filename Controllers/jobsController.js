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
   (await Jobs.find()).reverse
   .then(result => res.json(result))
   .catch(error => {
  res.status(412).json({msg: error.message});
  });
}


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

    const jobData = jobs.map((job) => {
      let jobSummary = '';
      if (job.bio) {
        jobSummary = job.bio.substring(0, 3); // قص النص ليكون ثلاثة أسطر فقط
      }

      return {
        time: job.createdAt,
        location: job.location,
        jobTitle: job.name,
        jobSummary: jobSummary,
      };
    });

    res.json({ jobs: jobData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    deleteJobs,
    postJobs,
    allJobs,
    updateJob,
    getAllRequestsJobs,
    getLatestJobs
}

