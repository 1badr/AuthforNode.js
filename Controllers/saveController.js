const Blogs = require('../models/Blogs');
const Save = require('../models/Save');
const User = require('../models/User');



const getUserSaves = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const userSaves = await Save.find({ IDUser: userId });
  
      res.status(200).json(userSaves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const savePost = async (req, res) => {
    try {
      const userId = req.body.userId;
      const postId = req.body.postId;
  
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const blog = await Blogs.findById(postId).populate('saves');
  
      if (!blog) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      blog.saves = blog.saves || []; // تحقق من وجود قيمة مبدئية لـ blog.saves في حالة كانت undefined
  
      const existingSave = await Save.findOne({ IDUser: userId, IDblog: postId });
  
      if (existingSave) {
        existingSave.state = !existingSave.state; // تغيير قيمة الحالة باستخدام عامل النفي (!)
        await existingSave.save();
  
        return res.json({ message: 'Save state updated', saved: existingSave.state });
      } else {
        const newSave = new Save({ IDUser: userId, IDblog: postId, state: true });
        await newSave.save();
  
        return res.json({ message: 'Saved', saved: true });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


  const getBlogSaves = async (req, res) => {
    const blogId = req.params.id;
  
    try {
      const saves = await Save.find({ IDblog: blogId });
  
      res.status(200).json(saves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getUserSaves,
    getBlogSaves,
    savePost,
  };