const mongoose = require ('mongoose');
const { default: isEmail } = require('validator/lib/isemail');
const bcrypt = require ('bcrypt');
const { isInteger } = require('lodash');
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema ({
    
    email : {
        type : String,
        required : [true,'email is required'],
        unique : true,
        lowercase : true,
        validate:[isEmail,'valid email please'],
    },
    password : {
        type : String ,
        require : [true,'pass is required'],
        minLength : [6,'mini is 6'],
    },
    name : {
        type: String,
        required: [true, 'name is required'],
        minlength: [1, 'Mini is 1'],
        maxlength: [30, 'Max is 30'],
    },
    type : {
        type: String,
    },
    image : {
        type : String, //التغيير الاخير  
    },
    location: {
        type: String,
      },
    categorey: {
        type: String,
      },
    gender: {
        type: String,
        enum: ['male', 'female'],
      },
    bio : {
        type : String,
    },
    employeeCount : {
        type : String,
    },
    CreateAt : {
         type: Date, default: Date.now 
        },
    CV: 
        {
        type: String,
        ref: 'CV',
        },
          
    comment: {type: String, ref: "Comments"},
    followers: {type: String, ref: "Followers"},
    blog: {type: String, ref: "Blogs"},


})

userSchema.post('save', function (doc,next){
    console.log('saved user',doc); 
    next();
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.statics.login = async function(email,password,name){
    const user = await this.findOne({ email});
    if (user){
        const auth = await bcrypt.compare(password,user.password);
        if (auth){
            return user;
        }
        throw Error('inncorect password');
    }
    throw Error('inncorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;