const { restart } = require('nodemon');
const Blog = require ('../models/Blogs');
const User = require ('../models/User');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');
const Blogs = require('../models/Blogs');

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

  const getArticlesByCommunity = async function (req, res) {
    try {
      const communityId = req.params.id; // استلام معرّف الهوية (ID) للمجتمع من طلب العميل
      const userType = req.query.userType; // استلام نوع المستخدم (User أو Company) من طلب العميل
  
      let articles;
      if (userType === 'User') {
        articles = await Blogs.find({ community: communityId, userType: 'User' });
      } else if (userType === 'Company') {
        articles = await Blogs.find({ community: communityId, userType: 'Company' });
      } else {
        return res.status(400).json({ error: 'نوع المستخدم غير صالح' });
      }
  
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getArticleById = async function (req, res) {
    try {
      const articleId = req.params.id; // استلام معرّف الهوية (ID) من طلب العميل
      const article = await Blog.findById(articleId);
      
      if (!article) {
        return res.status(404).json({ error: 'المقال غير موجود' });
      }
  
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getUserBlogs = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId).populate('blog');
      if (user) {
        const blogs = user.blog;
        res.status(200).json(blogs);
      } else {
        res.status(404).json({ error: 'المستخدم غير موجود' });
      }
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
    getArticlesByCommunity,
    getArticleById,
    getUserBlogs,
    getArticlesUserInLimit
}

