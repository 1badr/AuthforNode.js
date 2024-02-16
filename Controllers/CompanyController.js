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





  module.exports = {
    getTopFollowedCompanies,
    
}