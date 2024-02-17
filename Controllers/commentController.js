const { restart } = require('nodemon');
const Comment = require ('../models/Comments');
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
    const comments = await Comment.find({ article: articleId }).populate('commenterName', 'name');

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getUserComments = async (req, res) => {
  const userId = req.params.id;

  try {
    const comments = await Comment.find({ commenterName: userId });

    res.status(200).json(comments);
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

