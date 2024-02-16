const mongoose = require ('mongoose');

const SaveSchema = new mongoose.Schema ({
    IDUser: [{type: String, ref: "User", required: true}],
    IDblog: [{type: String, ref: "Blogs", required: true}],
    likes_count:  { type: Number, default: 0 }

});
const Save = mongoose.model('Save', SaveSchema);

module.exports = Save;