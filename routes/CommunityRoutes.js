const express = require('express');
const communityController = require('../Controllers/communityController');
const router = express.Router();

router.get('/AllCommu', communityController.AllCommu);
router.get('/AllUsers', communityController.AllUsers);
router.post('/postCommu', communityController.postCommu); // تحتاجه 
router.post('/postUsers', communityController.postUsers);
router.get('/searchInCommunity', communityController.searchInCommunity); 
router.delete('/deleteUser/:id', communityController.deleteUser);
router.delete('/deleteCommu/:id', communityController.deleteCommu); // تحتاجه 
router.get('/getCommuById/:id', communityController.getCommuById); // تحتاجه 
router.get('/getArticlesCompanyByType', communityController.getArticlesCompanyByType); // تحتاجه 
router.get('/getArticlesUserByType', communityController.getArticlesUserByType); // تحتاجه 
router.get('/getArticlesCompanyByTypeUser/:id', communityController.getArticlesCompanyByTypeUser); // تحتاجه 
router.get('/getArticlesCompanyByTypeCompany/:id', communityController.getArticlesCompanyByTypeCompany); // تحتاجه 
router.put('/ubdateCommunity/:id', communityController.ubdateCommunity); // تحتاجه 


module.exports = router;

