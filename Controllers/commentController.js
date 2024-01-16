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



module.exports = {
    postComment,
    deleteComment
}

