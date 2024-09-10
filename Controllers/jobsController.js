const { restart } = require('nodemon');
const Jobs = require ('../models/Jobs');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');
const Requests = require('../models/Requests');
const User = require('../models/User');
const CV = require('../models/CV');
const Followers = require('../models/Followers');

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
    const requests = await Requests.find({ jobId })
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
  const jobId = req.params.id;

  try {
    const jobs = await Jobs.find({ IDUser: jobId });

    if (jobs.length > 0) {
      res.json(jobs);
    } else {
      res.status(404).json({ error: 'No jobs found for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
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
            UserRequestName: company ? company.name : '',
            UserRequestImage: company ? company.image : '',
            jobName: request.jobId.name,
          });
        }
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    const getJobsByCompanyId = async (req, res) => {
      const userId = req.params.userId;
    
      try {
        const jobs = await Jobs.find({ userId });
    
        const requests = await Requests.find({ jobId: { $in: jobs.map(job => job._id) } });
    
        const response = [];
    
        for (const request of requests) {
          const job = jobs.find(job => job._id.toString() === request.jobId.toString());
          const company = await User.findById(request.companyId);
    
          response.push({
            requestId: request._id,
            jobId: request.jobId,
            jobName: job ? job.name : '',
            userId: request.userId,
            userName: job ? job.name : '',
            userImage: job ? job.image : '',
            UserRequestName: company ? company.name : '',
            UserRequestImage: company ? company.image : '',
          });
        }
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const getRequestsByUserId = async (req, res) => {
      const userId = req.params.userId;
    
      try {
        const requests = await Requests.find({ userId });
        const response = [];
    
        for (const request of requests) {
          const job = await Jobs.findById(request.jobId);
          const company = await User.findById(request.companyId);
    
          response.push(job);
        }
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };




    const getFollowedCompanyJobs = async (req, res) => {
      const id = req.params.id;
      try {
        const followers = await Followers.find({ IDUser: id ,following: true });
        const followedCompanyIds = followers.map((follower) => follower.IDFollower);
    
        // Fetch the jobs for each followed company
        const jobsWithCompanyDetails = await Promise.all(
          followedCompanyIds.map(async (companyId) => {
            const company = await User.findById(companyId, 'name image');
            const jobs = await Jobs.find({ IDUser: companyId });
            return jobs.map((job) => ({ ...job.toObject(), companyName: company.name, companyImage: company.image }));
          })
        );
    
        const allJobs = jobsWithCompanyDetails.flat();
    
        res.status(200).json(allJobs);
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
    getJobsByCompanyId,
    getRequestsByUserId,
    getFollowedCompanyJobs
}

