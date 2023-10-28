const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token,'iam badr',(err,decodedToken)=>{
            if (err){
                console.log(err.message);
                return res.json()

            }
            else{
                console.log(decodedToken);
                next();

            }
        });
    }
    else{
        return res.json();

    }
}

module.exports={requireAuth};