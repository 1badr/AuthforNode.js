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
    const { jobId,userId } = req.body;
    console.log(`${userId}    ${jobId}`)
    try {
      const cv = await CV.findOne({ userID: userId }).exec();
  
      // if (cv) {
      //   const request = await Requests.findOneAndUpdate(
      //     { userId, jobId },
      //     { sentIt: true },
      //     { new: true }
      //   ).exec();
  
      //   if (request) {
      //     const job = await Jobs.findById(jobId).exec();
      //     const user = await User.findById(userId).exec();
  
      //     const response = {
      //       jobs: [
      //         {
      //           userId: request.userId,
      //           jobId: request.jobId,
      //           image: user.image,
      //           jobName: job.name,
      //           userName: user.name
      //         }
      //       ]
      //     };
  
      //     return res.status(200).json(response);
      //   } else {
      //     return res.status(500).json({ error: 'Failed to update request' });
      //   }
      // } else
       //{
        const request = new Requests({ userId:userId, jobId });
        await request.save();
  
        const job = await Jobs.findById(jobId).exec();
        const user = await User.findById(userId).exec();
  
        const response = {
          jobs: [
            {
              userId: request.userId,
              userId: request,
              jobId: request.jobId,
              // image: user.image,
               jobName: job.name,
              // userName: user.name
            }
          ]
        };
  
        return res.status(200).json(response);
     // }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  const getAllTrueRequestsJobs = async (req, res) => {
    const jobId = req.params.id;
  
    try {
      const requests = await Requests.find({ jobId }).exec();
  
      const userIds = requests.map(request => request.userId);
      const users = await User.find({ _id: { $in: userIds } }).exec();
      const response = {
        jobs: requests.map(request => {
          const user = users.find(user => user._id.toString() === request.userId.toString());
          console.log('error')
          const job = Jobs.findById(request.jobId).exec();
          
          return {
            userId: request.userId,
            jobId: request.jobId,
            image: user.image,
            jobName: job.name,
            userName: user.name
          };
        })
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



const getAllRequestsJobsInCompany = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const jobs = await Jobs.find({ IDUser: userId });
    if (jobs.length === 0) {
      return res.status(200).json({ message: 'No jobs found for this company' });
    }

    const requestsByJob = {};

    for (const job of jobs) {
      const requests = await Requests.find({ jobId: job._id });

      if (requests.length > 0) {
        const userIds = requests.map(request => request.userId);
        const users = await User.find({ _id: { $in: userIds } }).exec();

        const jobRequests = requests.map(request => {
          const user = users.find(user => user._id.toString() === request.userId.toString());

          return {
            userId: requests.userId,
            jobId: requests.jobId,
            image: user.image,
            jobName: job.name,
            userName: user.name
          };
        });

        requestsByJob["job"] = {
          // userId: requests.userId,
          //   jobId: requests.jobId,
          //   image: user.image,
             jobName: job.name,
             userName: user.name,
            jobID: job._id,
            requestuserid: job.requestsId,
           requests: jobRequests
        };
      }
    }

    res.status(200).json(requestsByJob);
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
    getAllTrueRequestsJobs,
    handleCVRequest,
    getAllRequestsJobsInCompany
}

