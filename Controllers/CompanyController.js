const Jobs = require('../models/Jobs');
const User = require('../models/User');

const getTopFollowedCompanies = async (req, res) => {
  try {
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


const getCompanyJobs = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all the jobs for this user
    const userJobs = await Jobs.find({ IDUser: id });

    // Return the user information and their jobs
    res.status(200).json({
      _id: user._id,
      name: user.name,
      image: user.image,
      jobs: userJobs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  module.exports = {
    getTopFollowedCompanies,
    getCompanyJobs
    
}