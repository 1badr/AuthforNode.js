const mongoose = require ('mongoose');

const CommunitySchema = new mongoose.Schema ({
    name : {
        type : String,
    },
    bio : {
        type : String,
    },
    Categorey : {
        type : String,
    },
    members: [{type: mongoose.Types.ObjectId, ref: "User", ref: "Company", required: true}],
    create_at: {
        type :  { type: Date, default: Date.now },
    },
    admin: [{type: mongoose.Types.ObjectId, ref: "User", required: true}],
    IDMessages: [{type: mongoose.Types.ObjectId, ref: "Messages", required: true}]


});
const Community = mongoose.model('Comu', CommunitySchema);

module.exports = Community;