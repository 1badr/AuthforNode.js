const mongoose = require ('mongoose');

const FollowersSchema = new mongoose.Schema ({
    IDUser: { 
        type: String,
        ref: 'User',
            },
    IDFollower: {
        type: String,
        ref: 'User',
        },
    following: {
        type: Boolean, default: false 
    }
});
const Followers = mongoose.model('Followers', FollowersSchema);

module.exports = Followers;