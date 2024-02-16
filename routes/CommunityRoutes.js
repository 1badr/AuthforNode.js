const express = require('express');
const communityController = require('../Controllers/communityController');
const router = express.Router();

router.get('/AllCommu', communityController.AllCommu);
router.get('/AllUsers', communityController.AllUsers);
router.post('/postCommu', communityController.postCommu);
router.post('/postUsers', communityController.postUsers);
router.get('/searchInCommunity', communityController.searchInCommunity);
router.delete('/deleteUser/:id', communityController.deleteUser);
router.delete('/deleteCommu/:id', communityController.deleteCommu);


module.exports = router;

