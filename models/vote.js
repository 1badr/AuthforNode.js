const mongoose = require ('mongoose');

const voteSchema = new mongoose.Schema ({
    IDUser: [{type: String, ref: "User", required: true}],
    article: [{type: String, ref: "Categorey", required: true}],
    likes_count:  { type: Number, default: 0 }

});
const vote = mongoose.model('vote', voteSchema);

module.exports = vote;