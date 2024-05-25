const User = require('../models/User');
const Blog = require('../models/Blogs');
const Like = require('../models/Like');

const likePost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const blog = await Blog.findById(postId);

    if (!blog) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const existingLike = await Like.findOne({ IDUser: userId, IDblog: postId });

    if (existingLike) {
      // If the like already exists, toggle the state
      existingLike.liked = !existingLike.liked;
      await existingLike.save();
      res.json({ message: existingLike.liked ? 'Liked' : 'Unliked', liked: existingLike.liked });
    } else {
      // If the like doesn't exist, create a new one with the desired state
      const newLike = new Like({ IDUser: userId, IDblog: blog._id, liked: true });
      await newLike.save();
      res.json({ message: 'Liked', liked: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLikes = async (req, res) => {
  const userId = req.params.id;

  try {
    const userLikes = await Like.find({ IDUser: userId, liked: true });

    res.status(200).json(userLikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogLikes = async (req, res) => {
  const blogId = req.params.id;

  try {
    const likes = await Like.find({ IDblog: blogId, liked: true });

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