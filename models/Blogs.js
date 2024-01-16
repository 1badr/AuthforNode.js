const mongoose = require ('mongoose');

const BlogsSchema = new mongoose.Schema ({
    title : {
        type : String,
        require : true,
    },
    header : {
        type : String,
        require : true,
    },
    body : {
        type : String,
        require : true,
    },
    author : [{type: mongoose.Types.ObjectId,ref: ["User"],ref: ["Company"], required: true}],
    comment: [{type: mongoose.Types.ObjectId, ref: "Comment", required: true}],

});
const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;