const Jobs = require('../models/Jobs');
const User = require('../models/User'); // استبدل المسار بالمسار الصحيح لملف النموذج UserModel

const getTopFollowedCompanies = async (req, res) => {
  try {
    const companies = await User.find({ type: 'company' })
      .sort({ followers: -1 })
      .limit(10);

    const companyData = companies.map((company) => {
      return {
        name: User.name,
        image: User.image,
        followers: User.followers,
        id: User._id
      };
    });

    res.json({ companies: companyData });
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