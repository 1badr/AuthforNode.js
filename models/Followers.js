const mongoose = require ('mongoose');

const FollowersSchema = new mongoose.Schema ({
    IDUser: [{ 
        type:String,
        ref: 'User',
        required : true
            }],
    IDFollower: {
        type: String,
        ref: 'User',
        required : true

        }
});
const Followers = mongoose.model('Followers', FollowersSchema);

module.exports = Followers;