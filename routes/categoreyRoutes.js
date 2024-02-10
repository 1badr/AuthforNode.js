const express = require('express');
const categoreyConreoller = require('../Controllers/categoreyConreoller');
const router = express.Router();

router.delete('/delete/:id', categoreyConreoller.deleteCategorey);
router.post('/create', categoreyConreoller.postCategorey);
router.get('/getAllCategories', categoreyConreoller.getAllCategories);
router.get('/getCategoryById/:id', categoreyConreoller.getCategoryById);
router.put('/ubdate/:id', categoreyConreoller.ubdateblog);
router.post('/getCategoriesByEnum', categoreyConreoller.getCategoriesByEnum);


module.exports = router;

