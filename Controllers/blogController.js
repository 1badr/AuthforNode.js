const { restart } = require('nodemon');
const Blog = require ('../models/Blogs');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');

const deleteblog = (req, res) => {
  const id = req.params.id ;

  Blog.findByIdAndDelete(id)
  .then(result => {
    res.json();
  })
  .catch(err => {
    console.log(err);
  })
};

const postblog = async (req, res) => {
    const blogs = new Blog(req.body);
    blogs.save()
      .then((result) => {
        res.status(201).json({ blogs: blogs._id });
      });
  };


  const ubdateblog = (req, res) => {
    const id = req.params.id ;
    const blogs = new Blog(req.body);
    Blog.findByIdAndUpdate(id)
    blogs.save()
    .then(result => {
      res.json();
    })
    .catch(err => {
      console.log(err);
    })
  };


module.exports = {
    postblog,
    deleteblog,
    ubdateblog,
}

