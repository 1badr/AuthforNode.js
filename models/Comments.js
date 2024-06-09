const mongoose = require ('mongoose');
//badr
const CommentsSchema = new mongoose.Schema ({
    commenterID: {type: String, ref: "User" , required: true},
    body : {
        type : String,
    },
    blogID : {
        type : String,
        ref : "Blogs",
    },
    date : {
        date: { type: Date, default: Date.now },
    },
});
const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;