const { restart } = require('nodemon');
const Comment = require ('../models/Comments');
const CV = require ('../models/CV');
const User = require ('../models/User');
const { result } = require('lodash');


const postComment = async (req, res) => {
    const comments = new Comment(req.body);
    comments.save()
      .then((result) => {
        res.status(201).json({ comments: comments._id });
      });
  };

  
const deleteComment = (req,res) => {
  const id = req.params.id ;

  Comment.findByIdAndDelete(id)
  .then(result => {
    res.json();
  })
  .catch(err => {
    console.log(err);
  })
};



const getArticleComments = async (req, res) => {
  const articleId = req.params.id;

  try {
    const comments = await Comment.find({ blogID: articleId })
      .populate('commenterID', 'name image');

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getUserComments = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await CV.findById(userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const comments = await Comment.find({ commenterID: userID });

    const userData = {
      name: user.name,
      image: user.image
    };

    res.status(200).json({ user: userData, comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
    postComment,
    deleteComment,
    getUserComments,
    getArticleComments
}

