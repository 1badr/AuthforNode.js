const Category = require('../models/Categorey');
const Blogs = require('../models/Blogs');
const User = require('../models/User');
const Jobs = require('../models/Jobs');
const Community = require('../models/Community');
const Company = require('../models/Company');
const CV = require('../models/CV');
const Followers = require('../models/Followers');
const Comments = require('../models/Comments');
const Messages = require('../models/Messages');
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
    const mess = await Messages.find({ name: { $regex: searchQuery, $options: 'i' } })
    const jobs = await Jobs.find({ name: { $regex: searchQuery, $options: 'i' } })
    const tests = await Test.find({ name: { $regex: searchQuery, $options: 'i' } })

    res.status(200).json({folo,comm,mess,tests, CVs,cat , blog , users , communi , comp , jobs});
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ أثناء البحث' });
  }
};




module.exports = {
  search,
};