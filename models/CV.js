const mongoose = require ('mongoose');
const { default: isEmail } = require('validator/lib/isemail');

const CVSchema = new mongoose.Schema ({
    fullName : {
        type : String,
        require: [true, 'full name is required'],
    },
    address : {
        type : String,
        require: [true, 'address is required'],
    },
    phone : {
        type : String,
        require: [true, 'phone is required'],
    },
    email : {
        type : String,
        required : [true,'email is required'],
        validate:[isEmail,'valid email please'],
    },
    education: [{type: Array , required: true}],
    experience: [{type: Array , required: true}],
    skills: [{type: Array , required: true}],
    certificate: [{type: Array , required: true}],
    IDUser: [{type: mongoose.Types.ObjectId, ref: "User", required: true}],
});



const CV = mongoose.model('CV', CVSchema);

module.exports = CV;