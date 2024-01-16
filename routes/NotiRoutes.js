const express = require('express');
const NotiController = require('../Controllers/NotiController');
const router = express.Router();

router.get('/notiUnread', NotiController.getNotificationsCount);
router.post('/sendNotification', NotiController.startServer);
router.post('/state', NotiController.notiJob);
router.delete('/delete/:id', NotiController.deleteNoti);
router.get('/all', NotiController.AllNoti);



module.exports = router;

