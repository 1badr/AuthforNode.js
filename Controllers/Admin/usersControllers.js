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

const multer = require("multer");

// تعيين خيارات التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"), // المجلد الذي سيتم تخزين الصور فيه
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// تكوين multer
const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 5 }, // حد حجم الملف المسموح به (5 ميجابايت)
}).single("image"); // اسم حقل الصورة في النموذج

const updateUser = async (req, res) => {
    // تحميل الصورة باستخدام multer
    upload(req, res, async (err) => {
      if (err) {
        // حدث خطأ أثناء تحميل الصورة
        console.error(err);
        return res.status(500).json({ error: "حدث خطأ أثناء تحميل الصورة" });
      }
  
      try {
        const { email, password, name, type, bio, phone, location, categorey,states,
          employeeCount,
          CreateAt,
          companyCreateAt} = req.body;
        const userId = req.params.id; // معرف المستخدم المراد تحديثه
  
        let updatedUser = {
          email,
          password,
          name,
          type,
          bio,
          phone,
          location,
          categorey,
states,
bio,
phone,
employeeCount,
CreateAt,
companyCreateAt
        };
  
        if (req.file) {
          // تم تحميل صورة جديدة
          updatedUser.image = req.file.filename; // اسم الملف الذي تم تخزينه في المجلد
        }
  
        // تحديث بيانات المستخدم
        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  
        // إرجاع البيانات المحدثة للمستخدم
        res.status(200).json({
          email: user.email,
          name: user.name,
          type: user.type,
          bio: user.bio,
          image: user.image,
          phone: user.phone,
          location: user.location,
          category: user.categorey,
          type: user.type,
          password: user.password,

states: user.states,
bio: user.bio,
phone: user.phone,
employeeCount: user.employeeCount,
CreateAt: user.CreateAt,
companyCreateAt: user.companyCreateAt
        });
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(400).json({ error: 'Error updating user' });
      }
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

