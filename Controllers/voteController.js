const Vote = require('../models/vote');
const Blogs = require('../models/Blogs');
const Comments = require('../models/Comments');

const addVoteBlogs = async function (req, res) {
  const articleId = req.body.id;
  const userId = req.body.user;
  const voteType = req.body.vote;

  try {
    const article = await Blogs.findById(articleId);
    if (!article) {
      return res.status(404).send('Article not found');
    }

    const existingVote = await Vote.findOne({ article: articleId, IDUser: userId });
    if (existingVote) {
      return res.status(403).send('User already cast vote');
    }

    const vote = new Vote({
      article: articleId,
      IDUser: userId,
      likes_count: 0
    });

    if (voteType === 'up') {
      article.likes_count += 1;
      vote.likes_count = 1;
    } else if (voteType === 'down') {
      article.likes_count -= 1;
      vote.likes_count = -1;
    }

    const savedVote = await vote.save();
    await article.save();

    return res.status(200).json(savedVote);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};




const addVoteComments = async function (req, res) {
  const articleId = req.body.id;
  const userId = req.body.user;
  const voteType = req.body.vote;

  try {
    const article = await Comments.findById(articleId);
    if (!article) {
      return res.status(404).send('Article not found');
    }

    const existingVote = await Vote.findOne({ article: articleId, IDUser: userId });
    if (existingVote) {
      return res.status(403).send('User already cast vote');
    }

    const vote = new Vote({
      article: articleId,
      IDUser: userId,
      likes_count: 0
    });

    if (voteType === 'up') {
      article.likes_count += 1;
      vote.likes_count = 1;
    } else if (voteType === 'down') {
      article.likes_count -= 1;
      vote.likes_count = -1;
    }

    const savedVote = await vote.save();
    await article.save();

    return res.status(200).json(savedVote);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  addVoteComments,
  addVoteBlogs
};