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
        enum: ['Program', 'Desgin', 'Medical' , 'Mangment']   

    },
    members: [{type: String, ref: "User"}],
    create_at: {
        type :  { type: Date, default: Date.now },
    },
    admin: [{type: String, ref: "User"}],
    IDMessages: [{type: String, ref: "Messages"}]


});
const Community = mongoose.model('Comu', CommunitySchema);

module.exports = Community;