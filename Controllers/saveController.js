const Save = require('../models/Save');



const getUserSaves = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const userSaves = await Save.find({ IDUser: userId });
  
      res.status(200).json(userSaves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  module.exports = {
    getUserSaves,
  };