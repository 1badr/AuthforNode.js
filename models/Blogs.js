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
    author : {type: String,ref: "User" },
    comment: {type:String, ref: "Comment"},

});
const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;


