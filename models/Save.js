const mongoose = require ('mongoose');

const SaveSchema = new mongoose.Schema({
  IDUser: { type: String, ref: 'User' },
  IDblog: { type: String, ref: 'Blogs' },
  state: { type: Boolean, default: null },
});

const Save = mongoose.model('Save', SaveSchema);

module.exports = Save;