const { restart } = require('nodemon');
const User = require ('../models/User');
const {isEmail} = require ('validator'); 
const jwt =require('jsonwebtoken');



const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', name: '' };

  if (err.code === 'incorrect email') {
    errors.email = 'This email is not registered';
  }

  if (err.code === 'incorrect password') {
    errors.password = 'This password is incorrect';
  }

  if (err.code === 11000) {
    errors.email = 'This email is already in use';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    if (err.errors) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  }

  return errors; // إضافة هذا السطر لإرجاع الأخطاء الافتراضية
};


const maxAge = 3*24*60*60 // in secondes , cookie in millie seconds
const createToken =(id) =>{
    return jwt.sign({id},'badrIsLegend',{
    expiresIn:maxAge
    });
}
module.exports.signup_get = (req,res) => {
    res.render('signup');
}

module.exports.login_get = (req,res) => {
    res.render('login');
}

const multer = require("multer");
const path = require("path");

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

// معالجة طلب الاشتراك
module.exports.signup_post = async (req, res) => {
  // تحميل الصورة باستخدام multer
  upload(req, res, async (err) => {
    if (err) {
      // حدث خطأ أثناء تحميل الصورة
      console.error(err);
      return res.status(500).json({ error: "حدث خطأ أثناء تحميل الصورة" });
    }

    try {
      const {
        email,
        password,
        name,
        type,
        location,
        category,
        gender,
        bio,
        employeeCount,
        companyCreateAt,
        CV,
        comment,
        followers,
        blog,
      } = req.body;

      let image = ""; // اسم الملف الذي سيتم حفظه في قاعدة البيانات

      if (req.file) {
        // تم تحميل صورة
        image = req.file.filename; // اسم الملف الذي تم تخزينه في المجلد
      }

      // إنشاء المستخدم الجديد بما في ذلك الصورة
      const user = await User.create({
        email,
        password,
        name,
        type,
        image,
        location,
        category,
        gender,
        bio,
        employeeCount,
        companyCreateAt,
        CV,
        comment,
        followers,
        blog,
      });

      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ type: user.type, id: user._id });
    } catch (err) {
      let error = handleErrors(err);
      res.status(400).json({ error });
    }
  });
};

module.exports.signupCompany = async (req, res) => {
  // تحميل الصورة باستخدام multer
  upload(req, res, async (err) => {
    if (err) {
      // حدث خطأ أثناء تحميل الصورة
      console.error(err);
      return res.status(500).json({ error: "حدث خطأ أثناء تحميل الصورة" });
    }

    try {
      const {
        email,
        password,
        name,
        type,
        bio,
        phone,
        createAt,
        employeeCount
      } = req.body;

      let image = ""; // اسم الملف الذي سيتم حفظه في قاعدة البيانات

      if (req.file) {
        // تم تحميل صورة
        image = req.file.filename; // اسم الملف الذي تم تخزينه في المجلد
      }

      // إنشاء المستخدم الجديد بما في ذلك الصورة
      const user = await User.create({
        email,
        password,
        name,
        type,
        bio,
        image,
        phone,
        createAt,
        employeeCount
      });

      // قم بتحديث الموقع والفئة بعد إنشاء المستخدم
      user.location = req.body.location;
      user.categorey = req.body.categorey;
      await user.save();

      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ type: user.type, id: user._id, location: user.location, category: user.category });
    } catch (err) {
      let error = handleErrors(err);
      res.status(400).json({ error });
    }
  });
};






module.exports.login_post = async (req,res) => {
    const { email , password, name} = req.body
    
    try{
        const user = await User.login(email,password,name);
        const userType = user.type;
        const userId = user._id;
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({ type: user.type, id: user._id , name: user.name});    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json({error});
    }
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    return res.json();

}


module.exports.getUserImageById = async function (req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Not Found' });
    }

    const userImage = user.image;
    res.json(userImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports.getUserNameById = async function (req, res) {
  try {
    const userId = req.params.id; 
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Not Found' });
    }

    const userName = user.name;
    res.json(userName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports.postEmployee = async (req,res) => {
  const { email , password , name , address , bio ,location , image ,categorey} = req.body;
  
  try {
      let Employee = await User.create({ email , password , name , address , bio ,location , image ,categorey});
      res.status(201).json({Employee:Employee._id});
  }
  catch (err){
      res.status(400).json(err)

  }
}