const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  header: {
    type: String,
  },
  body: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
  author: {
    type: String,
    ref: 'User',
  },
  comment: {
    type: String,
    ref: 'Comment',
  },
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;