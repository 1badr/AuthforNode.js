const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  IDUser: { type: String, ref: "User" },
  IDblog: { type: String, ref: "Blogs" },
  liked: { type: Boolean, default: null }
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;