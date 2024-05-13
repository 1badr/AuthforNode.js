const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  IDUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  IDblog: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;