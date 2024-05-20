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

    res.status(200).json({ jobs});
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
  const filter = {};

  if (req.body.name) {
    filter.name = req.body.name;
  }
  if (req.body.category) {
    filter.category = req.body.category;
  }
  if (req.body.workSchedule) {
    filter.workSchedule = req.body.workSchedule;
  }
  if (req.body.type) {
    filter.type = req.body.type;
  }
  if (req.body.education) {
    filter.education = req.body.education;
  }

  // Remove empty properties from the filter object
  Object.keys(filter).forEach((key) => {
    if (!filter[key]) {
      delete filter[key];
    }
  });

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