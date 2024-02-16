const { restart } = require('nodemon');
const CV = require ('../../models/CV');
const User = require ('../../models/User');

const { result } = require('lodash');


const postCV = async (req, res) => {
    const CVs = new CV(req.body);
    CVs.save()
      .then((result) => {
        res.status(201).json({ CVs: CVs._id });
      });
  };

  
const deleteCV = async (req,res) => {
  const id = req.params.id ;

  CV.findByIdAndDelete(id)
  .then(result => {
    res.status(201).json();
  })
  .catch(err => {
    console.log(err);
  })
};




const allCvs = async (req,res) => {
  try {
  usersCount =await CV.count()
  users = await User.find()
  return res.status(200).json({users,usersCount});
}
catch (e){
  console.log(e.message)
}
};




const getUserCvs = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('CV');
    if (user) {
      const blogs = user.CVs;
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ error: 'المستخدم غير موجود' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getCVById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await CV.findOne({ _id: categoryId });

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

module.exports = {
    postCV,
    deleteCV,
    allCvs,
    getUserCvs,
    getCVById,
}

