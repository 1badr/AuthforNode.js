const mongoose = require ('mongoose');

const LikeSchema = new mongoose.Schema ({
    IDUser: [{type: String, ref: "User", required: true}],
    IDblog: [{type: String, ref: "Blogs", required: true}],

});
const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;