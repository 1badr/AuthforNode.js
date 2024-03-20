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
  CVCount =await CV.count()
  CVs = await CV.find()
  return res.status(200).json({CVCount,CVs});
}
catch (e){
  console.log(e.message)
}
};



const getUserCvs = async (req, res) => {
  const userId = req.params.id;

  try {
    const userCVs = await CV.find({ userID: userId });
    if (userCVs) {
      res.status(200).json({ cvs: userCVs });
    } else {
      res.status(404).json({ error: 'المستخدم غير موجود' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCVById = async (req, res) => {
  try {
    const cvId = req.params.id;
    const cv = await CV.findOne({ _id: cvId });

    if (!cv) {
      return res.status(404).json({ error: 'السيرة الذاتية غير موجودة' });
    }

    res.json({cv});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCV = (req, res) => {
  const id = req.params.id;
  const cvData = req.body;

  CV.findByIdAndUpdate(id, cvData)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'erorr' });
    });
};



const getCVUserById = async (req, res) => {
  try {
    const cvId = req.params.id;
    const cv = await User.findOne({ _id: cvId });

    if (!cv) {
      return res.status(404).json({ error: 'السيرة الذاتية غير موجودة' });
    }

    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    postCV,
    deleteCV,
    allCvs,
    updateCV,
    getUserCvs,
    getCVById,
    getCVUserById
}

