const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isemail');
const bcrypt = require('bcrypt');
const { isInteger } = require('lodash');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minLength: [6, 'Minimum password length is 6 characters'],
  },
  name: {
    type: String,
    minlength: [1, 'Minimum name length is 1 character'],
    maxlength: [30, 'Maximum name length is 30 characters'],
  },
  type: {
    type: String,
    enum: ['admin', 'user', 'employee', 'company'],
  },
  image: {
    type: String,
  },
  location: {
      type: String,
    
  },
  categorey: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  states: {
    type: String,
    enum: ['عدن',
    'صنعاء',
    'حضرموت',
    'تعز',
    'شبوة',
    'الحديدة',
    'مأرب',
    'الضالع',
    'المهرة',
    'لحج',
    'عمران',
    'أبين',
    'الجوف',
    'صعدة',
    'سقطرى',
    'حجة',
    'المحويت',
    'البيضاء',
    'إب',
    'ذمار'],
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  employeeCount: {
    type: String,
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
  companyCreateAt: {
    type: String,
  },
  CV: {
    type: String,
    ref: 'CV',
  },
  comment: {
    type: String,
    ref: 'Comments',
  },
  followers: {
    type: String,
    ref: 'Followers',
  },
  blog: {
    type: String,
    ref: 'Blogs',
  },
  jobs: {
    type: String,
    ref: 'Jobs',
  },
});

userSchema.post('save', function (doc, next) {
  console.log('saved user', doc);
  next();
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

const User = mongoose.model('User', userSchema);

module.exports = User;