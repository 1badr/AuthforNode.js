const Jobs = require('../models/Jobs');
const User = require('../models/User'); // استبدل المسار بالمسار الصحيح لملف النموذج UserModel

const getTopFollowedCompanies = async (req, res) => {
  try {
    // Get the top 20 most followed users
    const users = await User.find({ type: 'company' })
      .sort({ followers: -1 })
      .limit(20)
      .select({
        _id: 1,
        name: 1,
        image: 1,
        followers: 1
      });

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getCompanyJobs(req, res) {
  const companyId = req.params.companyId;

  try {
    // const company = await User.findById(companyId);

    // if (!company) {
    //   return res.status(404).json({ message: 'Company not found' });
    // }

    const companyJobs = await Jobs.find({ IDUser: companyId });

    if (companyJobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this company' });
    }

    res.status(200).json({ jobs: companyJobs });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}




  module.exports = {
    getTopFollowedCompanies,
    getCompanyJobs
    
}