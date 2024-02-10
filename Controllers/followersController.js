const Company = require('../models/Company');
const User = require('../models/User');
const Followers = require('../models/Followers');
// UserController.js

const followUser = async (req, res) => {
  try {
    const otherUserId = req.body.otherUser;
    const currentUser = req.body.userId;

    // Find the current user
    const user = await User.findById(currentUser);

    // Find the other user
    const otherUser = await Company.findById(otherUserId);

    // Check if the current user is already following the other user
    const isFollowing = user.followers.includes(otherUserId);

    if (isFollowing) {
      // If already following, remove the follower
      const followerIndex = user.followers.indexOf(otherUserId);
      const followingIndex = otherUser.followers.indexOf(currentUser);

      user.followers.splice(followerIndex, 1);
      otherUser.followers.splice(followingIndex, 1);

      await Promise.all([user.save(), otherUser.save()]);

      // Remove the entry from Followers collection
      await Followers.findOneAndDelete({
        IDUser: otherUserId,
        IDFollower: currentUser
      });

      res.json({ message: "Unfollowed user" });
    } else {
      // If not following, add the follower
      user.followers.push(otherUserId);
      otherUser.followers.push(currentUser);

      await Promise.all([user.save(), otherUser.save()]);

      // Create a new entry in the Followers collection
      const newFollower = new Followers({
        IDUser: otherUserId,
        IDFollower: currentUser
      });
      await newFollower.save();

      res.json({ message: "Followed user" });
    }
  } catch (error) {
    res.json(error);
  }
}


const getUserFollowers = async (req, res) => {
  const userId = req.params.id;
  
  try {
  const user = await User.findById(userId).populate('blog');
  if (user) {
  const blogs = user.followers;
  res.status(200).json(blogs);
  } else {
  res.status(404).json({ error: 'المستخدم غير موجود' });
  }
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
  };

module.exports =
{
  followUser,
  getUserFollowers
}