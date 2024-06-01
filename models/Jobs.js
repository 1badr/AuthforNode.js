const mongoose = require ('mongoose');
const Categorey = require('./Categorey');

const JobsSchema = new mongoose.Schema ({
    IDUser: {type: String, ref: "User"},
    name : {
        type : String,
    },
    location : {
        type : String,
    },
    image : {
        type : String,
        ref:"User"
    },
    Categorey : {
        type : String,
        // enum: ['برمجة', 'تصميم', 'طب' , 'ادارة']   
    },
    bio : {
        type : String,
    },
    workSchedule: {
        type: String,
        enum: ['دوام جزئي', 'دوام كامل'],
    },
    type: {
        type: String,
        enum: ['عن بعد', 'حضوري'],
    },
    salary : {
        type : String,
    },
    CVs: {
        type : String, ref: "CV",
    },
    states: {
        type: String,
        enum: ['عدن',
        'صنعاء',
        'حضرموت',
        'تعز',
        'شبوة',
        'الحديدة',
        'مأرب',
        'الضالع',
        'المهرة',
        'لحج',
        'عمران',
        'أبين',
        'الجوف',
        'صعدة',
        'سقطرى',
        'حجة',
        'المحويت',
        'البيضاء',
        'إب',
        'ذمار'],
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