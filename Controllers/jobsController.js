const { restart } = require('nodemon');
const Jobs = require ('../models/Jobs');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');
const Requests = require('../models/Requests');
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
      // التحقق مما إذا كان لدى المستخدم سيرة ذاتية
      const cv = await CV.findOne({ userID: userId }).exec();
  
      if (cv) {
        // إذا وجدت سيرة ذاتية
        const request = await Requests.findOneAndUpdate(
          { userId, jobId },
          { sentIt: true },
          { new: true }
        ).exec();
  
        if (request) {
          return res.status(200).json({ hasCV: true, requestUpdated: true, sentIt: true });
        } else {
          return res.status(500).json({ error: 'Failed to update request' });
        }
      } else {
        // إذا لم توجد سيرة ذاتية
        const request = new Requests({ userId, jobId });
        await request.save();
  
        return res.status(200).json({ hasCV: true, requestSaved: true });
      }
    } catch (error) {
      // إدارة الأخطاء في حالة حدوث خطأ أثناء الاستعلام عن قاعدة البيانات أو حفظ البيانات
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  const getAllTrueRequestsJobs = async (req, res) => {
    const jobId = req.params.id;
  
    try {
      const requests = await Requests.find({ jobId, sentIt: true }).exec();
      res.status(200).json(requests);
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
    handleCVRequest
}

