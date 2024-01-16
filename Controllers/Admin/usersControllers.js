const User = require ('../../models/User');


const AllUsers = async (req,res) => {
    try {
    users = await User.find()
    return res.status(200).json({users});
  }
  catch (e){
    console.log(e.message)
  }
};



const getuser = async (req,res) => {
  const id = req.params.id ;

  User.findById(id)
  .then(result => {
    console.log("found")
    res.status(200).json(id);
  })
  .catch(err => {
    console.log(err);
  })
};





const deleteuser = async (req,res) => {
  const id = req.params.id ;

  User.findByIdAndDelete(id)
  .then(result => {
    console.log("delete")
    res.status(200).json();
  })
  .catch(err => {
    console.log(err);
  })
};


module.exports = {
    AllUsers,
    deleteuser,
    getuser,
}

