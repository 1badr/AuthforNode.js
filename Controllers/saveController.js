const Blogs = require('../models/Blogs');
const Save = require('../models/Save');
const User = require('../models/User');
const Jobs = require('../models/Jobs');


const getUserSaves = async (req, res) => {
  const userId = req.params.id;

  try {
    // Get the user's saved jobs from the Save collection
    const userSaves = await Save.find({ IDUser: userId, state: true }, { IDblog: 1, state: 1 });
    const savedJobIds = userSaves.map((save) => save.IDblog);

    // Get the job details from the Jobs collection
    const jobs = await Jobs.find({ _id: { $in: savedJobIds } });

    // Combine the saved job information with the job details
    const jobDetails = await Promise.all(
      jobs.map(async (job) => {
        const savedJob = userSaves.find((save) => save.IDblog === job._id.toString());
        return {
          jobID: job._id,
          IDUser: userId,
          jobName: job.name,
          jobLocation: job.location,
          jobImage: job.image,
          jobCategorey: job.Categorey,
          jobBio: job.bio,
          jobWorkSchedule: job.workSchedule,
          jobType: job.type,
          jobSalary: job.salary,
          jobCVs: job.CVs,
          jobstates: job.states,
          jobeducation: job.education,
          jobexperience: job.experience,
          jobskills: job.skills,
          jobcertificate: job.certificate,
          jobcomment: job.comment,
          jobrequestsId: job.requestsId,
          jobState: savedJob.state,
        };
      })
    );

    res.status(200).json({ jobDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  const savePost = async (req, res) => {
    try {
      const userId = req.body.userId;
      const postId = req.body.postId;
  
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const blog = await Jobs.findById(postId).populate('saves');
  
      if (!blog) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      blog.saves = blog.saves || []; // تحقق من وجود قيمة مبدئية لـ blog.saves في حالة كانت undefined
  
      const existingSave = await Save.findOne({ IDUser: userId, IDblog: postId });
  
      if (existingSave) {
        existingSave.state = !existingSave.state; // تغيير قيمة الحالة باستخدام عامل النفي (!)
        await existingSave.save();
  
        return res.json({ message: 'Save state updated', saved: existingSave.state });
      } else {
        const newSave = new Save({ IDUser: userId, IDblog: postId, state: true });
        await newSave.save();
  
        return res.json({ message: 'Saved', saved: true });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


  const getBlogSaves = async (req, res) => {
    const blogId = req.params.id;
  
    try {
      // Get the saves for the specified blog
      const saves = await Save.find({ IDblog: blogId, state: true }, { IDUser: 1, IDblog: 1, state: 1 });
      const userIds = saves.map((save) => save.IDUser.toString());
      const blogIds = saves.map((save) => save.IDblog.toString());
  
      // Get the user details for the users who saved the blog
      const users = await User.find({ _id: { $in: userIds } }, {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        image: 1,
        type: 1,
        image: 1,
        location: 1,
        categorey: 1,
        gender: 1,
        states: 1,
        bio: 1,
      });
  
      // Get the job details for the saved blogs
      const jobs = await Jobs.find({ _id: { $in: blogIds } }, {
        _id: 1,
        name: 1,
        location: 1,
        image: 1,
        Categorey: 1,
        bio: 1,
        workSchedule: 1,
        type: 1,
        salary: 1,
        CVs: 1,
        states: 1,
        education: 1,
        experience: 1,
        skills: 1,
        certificate: 1,
        comment: 1,
        requestsId: 1,
      });
  
      const userDetailsWithJobInfo = users.map((user) => ({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        type: user.type,
        location: user.location,
        categorey: user.categorey,
        gender: user.gender,
        states: user.states,
        bio: user.bio,
        state: saves.find((save) => save.IDUser.toString() === user._id.toString())?.state || false,
        jobs: jobs.filter((job) => blogIds.includes(job._id.toString())),
      }));
  
      res.status(200).json(userDetailsWithJobInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getUserSaves,
    getBlogSaves,
    savePost,
  };