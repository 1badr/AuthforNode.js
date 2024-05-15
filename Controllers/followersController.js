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


const getFollowers = async (req, res) => {
  const IDUser = req.params.id;

  try {
    const followers = await Followers.find({ IDFollower:IDUser }).populate('IDFollower');

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  const checkIfUserFollows = async (req, res) => {
    try {
      const { followerUserID, followedUserID } = req.body;
  
      const follower = await Followers.findOne({
        IDUser: followerUserID,
        IDFollower: followedUserID
      }).exec();
  
      if (follower) {
        return res.status(200).json(follower);
      } else {
        return res.status(404).json({ error: 'المستخدم غير موجود' });
      }
    } catch (error) {
      console.log({ error: error.message });
      return res.status(500).json({ error: 'حدث خطأ في الخادم' });
    }
  };


  const followerUser = async (req, res) => {
    try {
      const followerId = req.body.followerId; // معرف المتابع
      const followingId = req.body.followingId; // معرف المستخدم المُتابَع له
  
      // Find the follower user
      const follower = await User.findById(followerId);
  
      if (!follower) {
        return res.status(404).json({ error: 'Follower not found' });
      }
  
      // Find the following user
      const following = await User.findById(followingId);
  
      if (!following) {
        return res.status(404).json({ error: 'Following user not found' });
      }
  
      // Check if the follower is already following the user
      const isFollowing = follower.following && follower.following.includes(followingId);
  
      if (isFollowing) {
        // If already following, remove the following relationship
        follower.following = follower.following.filter((id) => id.toString() !== followingId);
        following.followers = following.followers.filter((id) => id.toString() !== followerId);
  
        await follower.save();
        await following.save();
  
        res.json({ message: 'Unfollowed', isFollowing: false });
      } else {
        // If not following, add the following relationship
        follower.following.push(followingId);
        following.followers.push(followerId);
  
        await follower.save();
        await following.save();
  
        res.json({ message: 'Followed', isFollowing: true });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports =
{
  followUser,
  getFollowers,
  checkIfUserFollows,
  unFollowUser,
  followerUser
}