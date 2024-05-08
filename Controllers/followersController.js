const User = require('../models/User');
const Followers = require('../models/Followers'); // استبدل 'path/to/FollowersModel' بالمسار الصحيح لنموذج جدول "المتابعون"
const followUser = async (req, res) => {
  try {
    const userId = req.body.userId; // اليوزر الأول
    const targetUserId = req.body.targetUserId; // اليوزر الثاني

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the target user
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }

    const isFollowing = user.following && user.following.includes(targetUserId);

    if (isFollowing) {
      const followIndex = user.following.indexOf(targetUserId);
      user.following.splice(followIndex, 1);

      await user.save();

      res.json({ message: 'Unfollowed' });
    } else {
      // Make sure the 'following' property is defined and initialized as an empty array
      user.following = user.following || [];
      user.following.push(targetUserId);

      await user.save();

      const followersEntry = new Followers({
        IDUser: targetUserId,
        IDFollower: userId
      });

      await followersEntry.save();

      res.json({ message: 'Followed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const unFollowUser = async (req, res) => {
  try {
    const userId = req.body.userId; // اليوزر الأول
    const targetUserId = req.body.targetUserId; // اليوزر الثاني

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the target user
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }

    // Check if the user is already following the target user
    const isFollowing = user.following && user.following.includes(targetUserId);

    if (isFollowing) {
      // If already following, remove the follow
      const followIndex = user.following.indexOf(targetUserId);
      user.following.splice(followIndex, 1);

      await user.save();

      res.json({ message: 'Unfollowed' });
    } else {
      res.json({ message: "User is not following the target user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getUserFollowers = async (req, res) => {
  const userId = req.params.id;
  
  try {
  const user = await Followers.findById(userId);
  if (user) {
  const blogs = user.IDUser;
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
  unFollowUser,
  getUserFollowers
}