const mongoose = require ('mongoose');

const FollowersSchema = new mongoose.Schema ({
    IDUser: { 
        type:String,
        ref: 'User',
            },
    IDFollower: {
        type: String,
        ref: 'User',

        }
});
const Followers = mongoose.model('Followers', FollowersSchema);

module.exports = Followers;