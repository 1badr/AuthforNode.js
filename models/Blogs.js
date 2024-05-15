const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  type: {
    type: String,
    enum: ['user', 'company']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like',
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: {
    type: String,
    ref: 'Comment',
  },
  communityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
  },
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;