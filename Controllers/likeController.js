const User = require('../models/User');
const Blog = require('../models/Blogs');
const Like = require('../models/Like');

const likePost = async (req, res) => {
  try {
    const userId = req.body.userId; // معرف المستخدم
    const postId = req.body.postId; // معرف المنشور

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the post
    const blog = await Blog.findById(postId).populate('likes');

    if (!blog) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already liked the post
    const isLiked = blog.likes.some((like) => like.IDUser.toString() === userId);

    if (isLiked) {
      // If already liked, remove the like
      blog.likes = blog.likes.filter((like) => like.IDUser.toString() !== userId);
      await blog.save();

      res.json({ message: 'Unliked' });
    } else {
      // If not liked, add the like
      const newLike = new Like({ IDUser: userId, IDblog: blog._id });
      await newLike.save();

      blog.likes.push(newLike);
      await blog.save();

      res.json({ message: 'Liked' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLikes = async (req, res) => {
  const userId = req.params.id;

  try {
    const userLikes = await Like.find({ IDUser: userId });

    res.status(200).json(userLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  likePost,
  getUserLikes,
};