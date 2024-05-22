const mongoose = require ('mongoose');
const { default: isEmail } = require('validator/lib/isemail');

const CVSchema = new mongoose.Schema ({
    fullName : {
        type : String,
    },
    address : {
        type : String,
    },
    phone : {
        type : String,
    },
    email : {
        type : String,
    },
    cv_image : {
        type : String,
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
    languages: {type: Array },
    education: {type: Array },
    experience: {type: Array},
    skills: {type: Array },
    certificate: {type: Array },
    userID: {type: String , ref:'User',require:true}
});



const CV = mongoose.model('CV', CVSchema);

module.exports = CV;