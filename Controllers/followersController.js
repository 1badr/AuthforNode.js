const User = require('../models/User');
const Followers = require('../models/Followers'); 



const followUser = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const targetUserId = req.body.targetUserId; 

    // const user = await User.findById(userId);

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // // Find the target user
    // const targetUser = await User.findById(targetUserId);

    // if (!targetUser) {
    //   return res.status(404).json({ error: "Target user not found" });
    // }

    // const isFollowing = user.following && user.following.includes(targetUserId);
    const user = await Followers.findOne({ IDUser: userId,IDFollower: targetUserId  });
    // const targetUser = await Followers.findOne({ IDFollower: targetUserId });

    if (user) {
      // const followIndex = user.following.indexOf(targetUserId);
      // user.following.splice(followIndex, 1);

      // await user.save();
      user.following = true;

      await user.save();

      res.json({ message: 'followed ', following:true });
      // res.json({ message: 'Unfollowed' });
    } else {

      // user.following = user.following || [];
      // user.following.push(targetUserId);

      // await user.save();

      const followersEntry = new Followers({
        IDUser: userId,
        IDFollower: targetUserId,
        following: true  
      });

      await followersEntry.save();

      res.json({ message: 'Followed', following:true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const unFollowUser = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const targetUserId = req.body.targetUserId; 

    // const user = await Followers.findOne({ IDUser: userId });

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // const targetUser = await Followers.findOne({ IDFollower: targetUserId });

    // if (!targetUser) {
    //   return res.status(404).json({ error: "Target user not found" });
    // }

    // const isFollowing = user.following;
    const follower = await Followers.findOne({
      IDUser: userId,
      IDFollower: targetUserId
    }).exec();

    if (follower) {

      follower.following = false;

      await follower.save();

      res.json({ message: 'Unfollowed', following:false });
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
    const followers = await Followers.find({ IDUser:IDUser ,following:true}).populate('IDFollower');

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
        return res.status(200).json({isFollowing : follower.following});
      } else {
        return res.status(200).json({isFollowing : false});
      }
    } catch (error) {
      console.log({ error: error.message });
      return res.status(500).json({ error: 'حدث خطأ في الخادم' });
    }
  };



module.exports =
{
  followUser,
  getFollowers,
  checkIfUserFollows,
  unFollowUser,
}