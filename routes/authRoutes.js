const { Router} = require('express');
const authController = require('../Controllers/authController');
const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.post('/signupCompany', authController.signupCompany);
router.get('/login', authController.login_get)
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/image/:id', authController.getUserImageById);

module.exports = router