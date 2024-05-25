const Category = require('../models/Categorey');
const Blogs = require('../models/Blogs');
const User = require('../models/User');
const Jobs = require('../models/Jobs');
const Community = require('../models/Community');
const Company = require('../models/Company');
const CV = require('../models/CV');
const Followers = require('../models/Followers');
const Comments = require('../models/Comments');
const Message = require('../models/Message')
const Test = require('../models/Test');

const search = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    // const cat = await Category.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const blog = await Blogs.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const communi = await Community.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const comp = await Company.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const CVs = await CV.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const folo = await Followers.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const comm = await Comments.find({ name: { $regex: searchQuery, $options: 'i' } })
    // const mess = await Message.find({ name: { $regex: searchQuery, $options: 'i' } })
     const jobs = await Jobs.find({ name: { $regex: searchQuery, $options: 'i' } })
// const tests = await Test.find({ name: { $regex: searchQuery, $options: 'i' } })

    // res.status(200).json({ jobs});
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
    res.status(500).json({ error: 'حدث خطأ أثناء البحث' });
  }
};

const filterBlogsByUserType = async (req, res) => {
  try {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const blogs = await Blogs.find({
      createdAt: { $gte: lastWeek, $lte: today },
    });

    const users = await User.find({ type: 'company' });

    const filteredUsers = users.filter((user) => {
      const userCreatedAt = user.CreateAt && user.CreateAt.getTime();
      return (
        userCreatedAt && userCreatedAt >= lastMonth.getTime() && userCreatedAt <= today.getTime()
      );
    });

    res.json({ blogs, users: filteredUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const filterJobs = async (req, res) => {


  const { name, location, salary, experience ,Categorey,
    bio,
    workSchedule,
    type,
    CVs,
    education,
    skills,
    certificate,
    createdAt
    // createdAtYear,
    // createdAtMonth,
    // createdAtDay

  } = req.body;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }
  if (Categorey) {
    filter.Categorey = { $regex: Categorey, $options: 'i' };
  }
  if (bio) {
    filter.bio = { $regex: bio, $options: 'i' };
  }
  if (workSchedule) {
    filter.workSchedule = { $regex: workSchedule, $options: 'i' };
  }
  if (type) {
    filter.type = { $regex: type, $options: 'i' };
  }
  if (CVs) {
    filter.CVs = { $regex: CVs, $options: 'i' };
  }
  if (education) {
    filter.education = { $regex: education, $options: 'i' };
  }
  if (skills) {
    filter.skills = { $regex: skills, $options: 'i' };
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  if (salary) {
    filter.salary = { $regex: salary, $options: 'i' };
  }

  if (experience) {
    filter.experience = { $regex: experience, $options: 'i' };
  }
  if (certificate) {
    filter.certificate = { $regex: certificate, $options: 'i' };
  }
  // if (createdAtYear) {
  //   filter.createdAt = { $gte: new Date(createdAtYear, 0, 1), $lte: new Date(createdAtYear, 11, 31) };
  // }
  // if (createdAtMonth) {
  //   filter.createdAt = { $gte: new Date(createdAtYear, createdAtMonth - 1, 1), $lte: new Date(createdAtYear, createdAtMonth, 0) };
  // }
  
  if (createdAt) {
    const endDate = createdAt;
  
    filter.createdAt = { $lte: endDate };
  }
  try {
    const jobs = await Jobs.find(filter);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






module.exports = {
  search,
  filterBlogsByUserType,
  filterJobs,
};