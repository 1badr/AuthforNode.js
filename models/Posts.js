const mongoose = require ('mongoose');

const PostsSchema = new mongoose.Schema ({
    body : {
        type : String,
    },
    Categorey : {
        type : String,
    },
    create_at: {
        type : date(),
    },
    comment: [{type: mongoose.Types.ObjectId, ref: "Comment", required: true}],
    author: [{type: mongoose.Types.ObjectId, ref: "User", required: true}],

});
const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;