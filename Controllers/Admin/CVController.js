const { restart } = require('nodemon');
const CV = require('../../models/CV');
const User = require('../../models/User');
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

const deleteCV = async (req, res) => {
  const id = req.params.id;

  CV.findByIdAndDelete(id)
    .then((result) => {
      res.status(201).json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const allCvs = async (req, res) => {
  try {
    CVCount = await CV.count();
    CVs = await CV.find();
    return res.status(200).json({ CVCount, CVs });
  } catch (e) {
    console.log(e.message);
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
    const cv = await CV.findOne({ userID: cvId });

    if (!cv) {
      return res.status(404).json({ error: 'السيرة الذاتية غير موجودة' });
    }

    res.json({ cv });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"), // المجلد الذي سيتم تخزين الصور فيه
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});
const uploade = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("cv_image"); 
const updateCV = async (req, res) => {
  uploade(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "حدث خطأ أثناء تحميل الصورة" });
    }

    try {
      const { fullName, address, phone, email, languages, education, experience, skills, certificate, states, userID } = req.body;
      const cvId = req.params.id; 

      let updatedCV = {
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
        userID
      };

      if (req.file) {
        updatedCV.cv_image = req.file.filename; 
      }

      const cv = await CV.findByIdAndUpdate(cvId, updatedCV, { new: true });

      res.status(200).json(cv);
    } catch (err) {
      console.error('Error updating CV:', err);
      res.status(400).json({ error: 'Error updating CV' });
    }
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
  getCVUserById,
};