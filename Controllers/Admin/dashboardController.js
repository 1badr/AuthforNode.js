const User = require ('../../models/User');
const Jobs = require ('../../models/Jobs');
const Company = require ('../../models/Company');


const allUsers = async (req,res) => {
    try {
    users = await User.find()
    return res.status(200).json({users});
  }
  catch (e){
    console.log(e.message)
  }
};

const allCompany = async (req,res) => {
    try {
    users = await Company.find()
    return res.status(200).json({users});
  }
  catch (e){
    console.log(e.message)
  }
};

const allJobs = async (req,res) => {
    try {
    users = await Jobs.find()
    return res.status(200).json({users});
  }
  catch (e){
    console.log(e.message)
  }
};

const allJobsLastMonth = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    
    const jobs = await Jobs.find({
      CreateAt: { $gte: lastMonth }
    });
    
    return res.status(200).json({ jobs });
  } catch (e) {
    console.log(e.message);
  }
};
const allCompanyLastMonth = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    
    const Companys = await Company.find({
      CreateAt: { $gte: lastMonth }
    });
    
    return res.status(200).json({ Companys });
  } catch (e) {
    console.log(e.message);
  }
};



const allUserLastMonth = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    
    const users = await User.find({
      CreateAt: { $gte: lastMonth }
    });
    
    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
  }
};

const allUserLastYear = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
    
    const users = await User.find({
      CreateAt: { $gte: lastMonth }
    });
    
    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
  }
};

const allJobsLastYear = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
    
    const users = await Jobs.find({
      CreateAt: { $gte: lastMonth }
    });
    
    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
  }
};

const allCompanyLastYear = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
    
    const users = await Company.find({
      CreateAt: { $gte: lastMonth }
    });
    
    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
  }
};


module.exports = {
    allUsers,
    allJobs,
    allCompany,
    allJobsLastMonth,
    allUserLastMonth,
    allCompanyLastMonth,
    allUserLastYear,
    allJobsLastYear,
    allCompanyLastYear,
}

