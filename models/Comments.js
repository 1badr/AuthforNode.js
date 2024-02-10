const mongoose = require ('mongoose');

const CommentsSchema = new mongoose.Schema ({
    commenterName: [{type: String, ref: "User", required: true}],
    body : {
        type : String,
        require : true,
    },
    date : {
        date: { type: Date, default: Date.now },
    },
});
const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;