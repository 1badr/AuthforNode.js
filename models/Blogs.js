
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
    enum: ['برمجة', 'تصميم', 'طب' , 'ادارة']   

},
  type: {
    type: String,
    enum: ['user', 'company'],
  },
  likes: {
    type: String,
    ref: 'Like',
  },
  author: {
    type: String,
    ref: 'CV',
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
