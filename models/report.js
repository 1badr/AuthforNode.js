const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: { type: String, ref: 'User' },
  reportedID : { type: String },
  reportType: {
    type: String,
    enum: ['انتهاك خصوصية', 'كراهية ضد الاسلام', 'تحرش' , 'الفاظ نابية','غيرذلك']   
},
  description: { type: String},
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;