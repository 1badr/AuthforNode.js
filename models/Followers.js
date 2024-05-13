const mongoose = require ('mongoose');

const FollowersSchema = new mongoose.Schema ({
    IDUser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
            },
    IDFollower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

        }
});
const Followers = mongoose.model('Followers', FollowersSchema);

module.exports = Followers;