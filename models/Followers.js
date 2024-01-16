const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();


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