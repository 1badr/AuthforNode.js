const { restart } = require('nodemon');
const Company = require ('../../models/Company');
const {isEmail} = require ('validator'); 
const User = require ('../../models/User');


module.exports.postCompany = async (req,res) => {
    const { email , password , name , address , bio ,location , image ,categorey} = req.body;
    
    try {
        let Companys = await Company.create({ email , password , name , address , bio ,location , image ,categorey});
        res.status(201).json({Company:Company._id});
    }
    catch (err){
        res.status(400).json(err)

    }
}


module.exports.postEmployee = async (req,res) => {
    const { email , password , name , address , bio ,location , image ,categorey} = req.body;
    
    try {
        let Company = await User.create({ email , password , name , address , bio ,location , image ,categorey});
        res.status(201).json({Company:Company._id});
    }
    catch (err){
        res.status(400).json(err)

    }
}