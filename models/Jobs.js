const mongoose = require ('mongoose');

const JobsSchema = new mongoose.Schema ({
    IDUser: {type: String, ref: "User"},
    name : {
        type : String,
    },
    location : {
        type : String,
    },
    bio : {
        type : String,
    },
    workSchedule: {
        type: String,
        enum: ['PART_TIME', 'FULL_TIME'],
    },
    type: {
        type: String,
        enum: ['Remote', 'immanence'],
        required: true
    },
    salary : {
        type : String,
    },
    CVs: {
        type : String, ref: "CV",
    },
    education: {
        type: String,
        enum: ['بكالوريوس', 'ثانوية عامة', 'ماجستير', 'دكتوراه'],
      },
    createdAt: { type: Date, default: Date.now },
    experience: {type: Array },
    skills: {type: Array },
    certificate: {type: Array },
    comment: {type: String, ref: "Comment"},
    requestsId: {type: String, ref: "Requests"},

});
const Jobs = mongoose.model('Jobs', JobsSchema);

module.exports = Jobs;