const mongoose = require ('mongoose');

const JobsSchema = new mongoose.Schema ({
    IDUser: [{type: mongoose.Types.ObjectId, ref: "Company", required: true}],
    name : {
        type : String,
    },
    location : {
        type : String,
        minLength: [20, 'mini is 20'],
    },
    bio : {
        type : String,
    },
    salary : {
        type : String,
    },
    education: [{type: Array , required: true}],
    experience: [{type: Array , required: true}],
    skills: [{type: Array , required: true}],
    certificate: [{type: Array , required: true}],
    comment: [{type: mongoose.Types.ObjectId, ref: "Comment", required: true}],
    IDUser: [{type: mongoose.Types.ObjectId, ref: "Company", required: true}],

});
const Jobs = mongoose.model('Jobs', JobsSchema);

module.exports = Jobs;