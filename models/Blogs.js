
const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  Categorey : {
    type : String, 

},
  type: {
    type: String,
    enum: ['user', 'company'],
  },
  createdAt: { type: Date, default: Date.now },
  likes: {
    type: String,
    ref: 'Like',
  },
  author: {
    type: String,
    ref: 'User',
  },
  comment: {
    type: String,
    ref: 'Comment',
  },
  saves: {
    type: String,
    ref: 'Save',
  },
  communityID: {
    type: String,
    ref: 'Community',
  },
});

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;
