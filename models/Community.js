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
        enum: ['برمجة', 'تصميم', 'طب' , 'ادارة']   

    },
    members: [{type: String, ref: "User"}],
    create_at: {
        type: Date,
        default: Date.now
    },
    userType: {
        type : String,
        enum: ["User","Company"] 
    },
    IDMessages: [{type: String, ref: "Messages"}]


});
const Community = mongoose.model('Comu', CommunitySchema);

module.exports = Community;