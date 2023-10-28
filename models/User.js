const mongoose = require ('mongoose');
const { default: isEmail } = require('validator/lib/isemail');
const bcrypt = require ('bcrypt');
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
    }
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

userSchema.statics.login = async function(email,password){
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