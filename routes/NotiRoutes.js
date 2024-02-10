const express = require('express');
const NotiController = require('../Controllers/NotiController');
const router = express.Router();

router.get('/notiUnread', NotiController.getNotificationsCount);
router.delete('/delete/:id', NotiController.deleteNoti);
router.get('/all', NotiController.AllNoti);
router.post('/sendCVs', NotiController.sendCVs);



module.exports = router;

