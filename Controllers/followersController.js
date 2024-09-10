const User = require('../models/User');
const Followers = require('../models/Followers'); 



const followUser = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const targetUserId = req.body.targetUserId; 
    const user = await Followers.findOne({ IDUser: userId,IDFollower: targetUserId  });

    if (user) {
     user.following = true;

      await user.save();

      res.json({ message: 'followed ', following:true });
    } else {

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