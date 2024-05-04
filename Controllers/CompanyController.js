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
    // البحث عن الشركة بناءً على معرّف الشركة
    const company = await User.findOne({ _id: companyId, type: 'company' })
      .populate('subscriptions');

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // الوظائف المرتبطة بالشركة
    const companyJobs = company.subscriptions;

    res.status(200).json({ jobs: companyJobs });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}



  module.exports = {
    getTopFollowedCompanies,
    getCompanyJobs
    
}