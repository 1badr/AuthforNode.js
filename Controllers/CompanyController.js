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
  const userId = req.params.userId;

  try {
    // استعادة الوظائف المرتبطة بالمستخدم من جدول الوظائف
    const userJobs = await Jobs.find({ IDUser: userId });

    res.status(200).json({ jobs: userJobs });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}



  module.exports = {
    getTopFollowedCompanies,
    getCompanyJobs
    
}