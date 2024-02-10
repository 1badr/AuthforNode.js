const mongoose = require ('mongoose');
const { default: isEmail } = require('validator/lib/isemail');

const CompanySchema = new mongoose.Schema ({
    name : {
        type : String,
    },
    address : {
        type : String,
        require: ['address is required'],
    },
    password : {
        type : String ,
        require : ['pass is required'],
        minLength : [6,'mini is 6'],
    },
    email : {
        type : String,
        required : ['email is required'],
        unique : true,
        lowercase : true,
        validate:[isEmail,'valid email please'],
    },
    bio : {
        type : String,
    },
    location : {
        type : String,
        minLength: [20, 'mini is 20'],
    },
    image : {
        type : String,
    },
    reting : {
        type : Number,
    },
    categorey : {
        type : String,
    },
    
    comment: [{type: String, ref: "Comments"}],

});
const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;