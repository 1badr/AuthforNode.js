const express = require('express');
const blogConreoller = require('../Controllers/blogController');
const router = express.Router();

router.delete('/delete/:id', blogConreoller.deleteblog);
router.post('/create', blogConreoller.postblog);
router.put('/ubdate/:id', blogConreoller.ubdateblog);



module.exports = router;

