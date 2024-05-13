const { restart } = require('nodemon');
const Jobs = require ('../models/Jobs');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');
const Requests = require('../models/Requests');
const User = require('../models/User');
const CV = require('../models/CV');

const postJobs = async (req, res) => {
    const job = new Jobs (req.body);
    job.save()
      .then((result) => {
        res.status(201).json({ job: job._id });
      });
  };

  
const deleteJobs = (req,res) => {
  const id = req.params.id ;

  Jobs.findByIdAndDelete(id)
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
    const reversedJobs = jobs.reverse();
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


const updateJobs = (req, res) => {
  const id = req.params.id;
  const cvData = req.body;

  Jobs.findByIdAndUpdate(id, cvData)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'erorr' });
    });
};


const getLatestJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const jobsWithUserDetails = await Promise.all(jobs.map(async (job) => {
      const user = await User.findById(job.IDUser);
      if (user) {
        const jobWithUserDetails = {
          ...job._doc,
          userImage: user.image,
          companyName: user.name
        };
        return jobWithUserDetails;
      } else {
        return null;
      }
    }));

    const filteredJobs = jobsWithUserDetails.filter(job => job !== null);

    res.json({ jobs: filteredJobs });
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




  const getJobsById = async (req, res) => {
    const JobId = req.params.id;
  
    try {
      const job = await Jobs.findOne({ IDUser: JobId });
  
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  };




  async function handleCVRequest(req, res) {
      const { userId, jobId } = req.body;
    
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('Invalid user');
        }
    
        const job = await Jobs.findById(jobId);
        if (!job) {
          throw new Error('Invalid job');
        }
        const request = new Requests({
          userId: userId,
          jobId: jobId,
          sentIt: true
        });
        await request.save();
        const response = {
          jobs: [
            {
              userId: userId,
              jobId: jobId,
              image: user.image,
              jobName: job.name,
              userName: user.name
            }
          ]
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }



    const getRequestsByJobId = async (req, res) => {
      const jobId = req.body.jobId;
    
      try {
        const requests = await Requests.find({ jobId: jobId, sentIt: true });
    
        const response = [];
    
        for (const request of requests) {
          const user = await User.findById(request.userId);
          const company = await User.findById(request.companyId);
    
          response.push({
            requestId: request._id,
            userId: request.userId,
            userName: user ? user.name : '',
            userImage: user ? user.image : '',
            companyName: company ? company.name : '',
            companyImage: company ? company.image : '',
            jobName: request.jobId.name,
          });
        }
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

const getJobsByUserId = async (req, res) => {
  const IDUser = req.params.id;

  try {

    const jobs = await Jobs.find({  IDUser })
      .select('_id name')
      .populate({
        path: 'IDUser',
        model: 'User',
        select: '_id image'
      });
        const users = await User.find({ _id: { $in: IDUser } }).exec();

          const user = users.find(user => user._id.toString() === IDUser.toString());

    const formattedJobs = jobs.map((job) => ({
      jobId: job._id,
      jobName: job.name,
      IDUser:IDUser,
      userName: user.name,
      userImage: user.image,
    }));

    res.status(200).json(formattedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  

module.exports = {
    deleteJobs,
    postJobs,
    allJobs,
    updateJobs,
    getAllRequestsJobs,
    getLatestJobs,
    getJobById,
    getJobsById,
    handleCVRequest,
    getRequestsByJobId,
    getJobsByUserId
}

