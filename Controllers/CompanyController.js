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
  const jobId = req.params.id;

  try {
    const requests = await Jobs.find({IDUser: jobId })
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




  module.exports = {
    getTopFollowedCompanies,
    getCompanyJobs
    
}