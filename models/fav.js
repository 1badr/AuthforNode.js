const mongoose = require ('mongoose');

const favSchema = new mongoose.Schema ({
    userId : {
        type : String,
        ref : "User"
    },
    blogId : {
        type: String,
        ref: "Blog"
    }

});
const fav = mongoose.model('fav', favSchema);

module.exports = fav;