const { restart } = require('nodemon');
const Blog = require ('../models/Blogs');
const User = require ('../models/User');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');
const Blogs = require('../models/Blogs');
const Community = require('../models/Community');
const Comments = require('../models/Comments');

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
    const id = req.params.id;
    const updatedBlog = req.body;
  
    Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  };
  

 const getArticlesByCommunityId = async (req, res) => {
  const communityId = req.params.communityId;

  try {
    const community = await Community.findById(communityId);

    res.status(200).json(community)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  const getArticleById = async function (req, res) {
    try {
      const articleId = req.params.id; 
      const article = await Blog.findById({articleId});
      
      if (!article) {
        return res.status(404).json({ error: 'Not Found' });
      }
  
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getUserBlogs = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const blogs = await Blogs.find({ author: userId });
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



  const getArticlesUserInLimit = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const articles = await Blogs.find({ author: userId }).limit(3);
  
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



module.exports = {
    postblog,
    deleteblog,
    ubdateblog,
    getArticleById,
    getUserBlogs,
    getArticlesUserInLimit,
    getArticlesByCommunityId,
}

