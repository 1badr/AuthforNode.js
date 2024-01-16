const express = require('express');
const categoreyConreoller = require('../Controllers/categoreyConreoller');
const router = express.Router();

router.delete('/delete/:id', categoreyConreoller.deleteCategorey);
router.post('/create', categoreyConreoller.postCategorey);
router.put('/ubdate/:id', categoreyConreoller.ubdateblog);


module.exports = router;

