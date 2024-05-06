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

    const cat = await Category.find({ name: { $regex: searchQuery, $options: 'i' } })
    const blog = await Blogs.find({ name: { $regex: searchQuery, $options: 'i' } })
    const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } })
    const communi = await Community.find({ name: { $regex: searchQuery, $options: 'i' } })
    const comp = await Company.find({ name: { $regex: searchQuery, $options: 'i' } })
    const CVs = await CV.find({ name: { $regex: searchQuery, $options: 'i' } })
    const folo = await Followers.find({ name: { $regex: searchQuery, $options: 'i' } })
    const comm = await Comments.find({ name: { $regex: searchQuery, $options: 'i' } })
    const mess = await Message.find({ name: { $regex: searchQuery, $options: 'i' } })
    const jobs = await Jobs.find({ name: { $regex: searchQuery, $options: 'i' } })
    const tests = await Test.find({ name: { $regex: searchQuery, $options: 'i' } })

    res.status(200).json({folo,comm,mess,tests, CVs,cat , blog , users , communi , comp , jobs});
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


const searchByLocation = async function (location) {
  try {
    const users = await User.find({ location: location }); // تمرير الموقع بشكل صحيح إلى دالة find
    return users;
  } catch (error) {
    throw new Error('Failed to search users by location');
  }
};


const searchByGender = async function (gender) {
  try {
    const users = await this.find({ gender });
    return users;
  } catch (error) {
    throw Error('Failed to search users by gender');
  }
};


const getworkScheduleJobs = async function () {
  try {
    const workScheduleJobs = await Jobs.find({ workSchedule });
    return workScheduleJobs;
  } catch (error) {
    throw new Error('فشل في استرداد الوظائف عن بُعد');
  }
};




const getTypeJobs = async function () {
  try {
    const remoteJobs = await Jobs.find({ type });
    return remoteJobs;
  } catch (error) {
    throw new Error('فشل في استرداد الوظائف عن بُعد');
  }
};

const getCategoreyJobs = async function () {
  try {
    const remoteJobs = await Category.find({ type });
    return remoteJobs;
  } catch (error) {
    throw new Error('فشل في استرداد الوظائف عن بُعد');
  }
};



const getJobsByEducation = async function (education) {
  try {
    const jobs = await Jobs.find({ education });
    return jobs;
  } catch (error) {
    throw new Error('فشل في استرداد الوظائف بناءً على نوع الشهادة');
  }
};



const getUserByEducation = async function (education) {
  try {
    const jobs = await CV.find({ education });
    return jobs;
  } catch (error) {
    throw new Error('فشل في استرداد الوظائف بناءً على نوع الشهادة');
  }
};


const getFilteredJobs = async function (req, res) {
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
      const userCreatedAt = user.createdAt.getTime();
      return (
        userCreatedAt >= lastMonth.getTime() && userCreatedAt <= today.getTime()
      );
    });

    const location = req.query.location;
    const gender = req.query.gender;
    const workSchedule = req.query.workSchedule;
    const education = req.query.education;

    const locationJobs = await Jobs.find({ location });
    const genderJobs = await Jobs.find({ gender });
    const workScheduleJobs = await Jobs.find({ workSchedule });
    const educationJobs = await Jobs.find({ education });

    const totalJobCount =
      blogs.length +
      filteredUsers.length +
      locationJobs.length +
      genderJobs.length +
      workScheduleJobs.length +
      educationJobs.length;

    const results = {
      blogs,
      users: filteredUsers,
      locationJobs,
      genderJobs,
      workScheduleJobs,
      educationJobs,
      totalJobCount,
    };

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  search,
  searchByLocation,
  searchByGender,
  filterBlogsByUserType,
  getworkScheduleJobs,
  getTypeJobs,
  getCategoreyJobs,
  getJobsByEducation,
  getUserByEducation,
  getFilteredJobs
};