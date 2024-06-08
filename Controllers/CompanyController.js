const Jobs = require('../models/Jobs');
const User = require('../models/User'); // استبدل المسار بالمسار الصحيح لملف النموذج UserModel

const getTopFollowedCompanies = async (req, res) => {
  try {
    // Get the top 20 most followed users
    const users = await User.find({ type: 'company',followersCount: { $gt: 0 } })
      .sort({ followersCount: -1 })
      .limit(20)
      .select({
        _id: 1,
        name: 1,
        image: 1,
        followersCount: 1
      });

    res.status(200).json( users );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const getTopFollowedCompanies = async (req, res) => {
//   try {
//     // Step 1: Aggregate to get the top 20 most followed companies
//     const topFollowedCompanies = await Followers.aggregate([
//       { $match: { following: true } },
//       { $group: { _id: "$IDUser", followersCount: { $sum: 1 } } },
//       { $sort: { followersCount: -1 } },
//       { $limit: 20 }
//     ]);

//     // Step 2: Get company details for the top 20 companies
//     const companyIds = topFollowedCompanies.map(company => company._id);
//     const companies = await User.find({ _id: { $in: companyIds }, type: 'company' })
//       .select({ _id: 1, name: 1, image: 1 });

//     // Step 3: Merge the followers count with the company details
//     const companiesWithFollowersCount = companies.map(company => {
//       const followersData = topFollowedCompanies.find(c => c._id.toString() === company._id.toString());
//       return {
//         _id: company._id,
//         name: company.name,
//         image: company.image,
//         followersCount: followersData ? followersData.followersCount : 0
//       };
//     });

//     res.status(200).json({ companies: companiesWithFollowersCount });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
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