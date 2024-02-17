const mongoose = require ('mongoose');

const googleUserSchema = new mongoose.Schema ({
    username: String,
    googleId : String

});
const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;