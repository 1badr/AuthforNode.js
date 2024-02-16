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


const getuser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

