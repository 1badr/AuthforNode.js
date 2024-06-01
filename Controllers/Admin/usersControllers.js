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


const getAllUsersByType = async (req, res) => {
  try {
    const users = await User.find({ userType: 'user' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEmployeeByType = async (req, res) => {
  try {
    const users = await User.find({ userType: 'employee' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCompanyByType = async (req, res) => {
  try {
    const users = await User.find({ type: 'company' });
    res.status(200).json(users);
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


const updateUser = (req, res) => {
  const id = req.params.id;
  const cvData = req.body;

  User.findByIdAndUpdate(id, cvData)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'erorr' });
    });
};

const fs = require('fs');
const path = require('path');

function myView(req, res) {
  const imagePath = path.join(__dirname, 'public', 'images', req.params.name);

  fs.stat(imagePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.error(err);
      return res.status(404).send('Image not found');
    }

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `inline; filename=${path.basename(imagePath)}`
    });

    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(res);
  });
}


module.exports = {
    AllUsers,
    deleteuser,
    getuser,
    updateUser,
    getAllEmployeeByType,
    getAllCompanyByType,
    getAllUsersByType,
    myView
    
}

