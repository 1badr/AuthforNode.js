const { restart } = require('nodemon');
const User = require ('../models/User');
const {isEmail} = require ('validator'); 
const jwt =require('jsonwebtoken');

const handleErrors = (err) =>{
    console.log(err.message,err.code);
    let errors = {email: '',password:''};

    if (err.code === 'incorrect email'){
        errors.email = 'this email is not registed';
    }
    
    if (err.code === 'incorrect password'){
        errors.email = 'this password is incorrect';
    }
    
    if (err.code === 11000){
        errors.email = 'this email is used'
        return errors; 
    }

    if (err.message.includes( 'user validation failed')){
        Object.values(err.error).forEach(({properties})=>{
            errors[properties.path] = properties.message
        });
        return errors
    
        
    }
}
const maxAge = 3*24*60*60 // in secondes , cookie in millie seconds
const createToken =(id) =>{
    return jwt.sign({id},'badr is legend',{
    expiresIn:maxAge
    });
}
module.exports.signup_get = (req,res) => {
    res.render('signup');
}

module.exports.login_get = (req,res) => {
    res.render('login');
}

module.exports.signup_post = async (req,res) => {
    const { email , password} = req.body;
    
    try {
        let user = await User.create({ email , password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch (err){
        let error = handleErrors(err)
        res.status(400).json({error})

    }
}

module.exports.login_post = async (req,res) => {
    const { email , password} = req.body
    
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json({});
    }
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    return res.json();

}