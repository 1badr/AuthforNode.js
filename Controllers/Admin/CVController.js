const { restart } = require('nodemon');
const CV = require ('../../models/CV');
const User = require ('../../models/User');
const multer = require('multer');
const path = require('path');


const upload = require('../../config/multerConfig');

const postCV = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const {
        fullName,
        address,
        phone,
        email,
        userID,
        languages,
        education,
        experience,
        states,
        skills,
        certificate,
      } = req.body;

      const files = req.files;

      const newCV = new CV({
        fullName,
        address,
        phone,
        email,
        languages,
        education,
        experience,
        skills,
        certificate,
        states,
        cv_image: files.find((file) => file.fieldname === 'cv_image')?.filename,
        userID,
      });

      await newCV.save();

      res.status(201).json(newCV);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
////
/////

const getCVById = async (req, res) => {
  try {
    const cvId = req.params.id;
    const cv = await CV.findOne({ userID: cvId });

    if (!cv) {
      return res.status(404).json({ error: 'السيرة الذاتية غير موجودة' });
    }

    res.json({cv});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCV = async (req, res) => {
  const id = req.params.id;
  const cvData = req.body;

  try {
    let cv = await CV.findById(id);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Update the CV data
    Object.assign(cv, cvData);

    // Save the updated CV
    await cv.save();

    res.json({ success: true, cv });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error updating CV' });
  }
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

