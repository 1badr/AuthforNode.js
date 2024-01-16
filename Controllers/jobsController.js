const { restart } = require('nodemon');
const Jobs = require ('../models/Jobs');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');


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


module.exports = {
    deleteJobs,
    postJobs,
    allJobs,
    updateJob
}

