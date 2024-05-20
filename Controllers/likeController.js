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
    const existingLike = blog.likes.find((like) => like.IDUser && like.IDUser.toString() === userId);

    if (existingLike) {
      // If already liked, remove the like and set liked to false
      blog.likes = blog.likes.filter((like) => like.IDUser && like.IDUser.toString() !== userId);
      await blog.save();

      // Update the existing like document
      existingLike.liked = false;
      await existingLike.save();

      res.json({ message: 'Unliked', liked: false });
    } else {
      // If not liked, add the like
      const newLike = new Like({ IDUser: userId, IDblog: blog._id, liked: true });
      await newLike.save();

      blog.likes.push(newLike);
      await blog.save();

      res.json({ message: 'Liked', liked: true });
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


const getBlogLikes = async (req, res) => {
  const blogId = req.params.id;

  try {
    const likes = await Like.find({ IDblog: blogId });

    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkIfUserLikes = async (req, res) => {
  try {
    const { likerUserID, likedUserID } = req.body;

    const likes = await Like.findOne({
      IDUser: likerUserID,
      IDblog: likedUserID
    }).exec();

    if (likes) {
      return res.status(200).json(likes);
    } else {
      return res.status(404).json({ error: 'المستخدم غير موجود' });
    }
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
};

module.exports = {
  likePost,
  getUserLikes,
  getBlogLikes,
  checkIfUserLikes,
};