const { restart } = require('nodemon');
const companyConroller = require ('../models/Company');
const {isEmail} = require ('validator'); 


module.exports.postCompany = async (req,res) => {
    const { email , password , name , address , bio ,location , image ,categorey} = req.body;
    
    try {
        let Company = await companyConroller.create({ email , password , name , address , bio ,location , image ,categorey});
        res.status(201).json({Company:Company._id});
    }
    catch (err){
        let error = handleErrors(err)
        res.status(400).json({error})

    }
}