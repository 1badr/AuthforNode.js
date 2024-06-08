const { restart } = require('nodemon');
const Categorey = require ('../models/Categorey');
const { result } = require('lodash');
const { async } = require('seed/lib/seed');


const deleteCategorey = (req,res) => {
  const id = req.params.id ;

  Categorey.findByIdAndDelete(id)
  .then(result => {
    res.json();
  })
  .catch(err => {
    console.log(err);
  })
};


const postCategorey = async (req, res) => {
  const categoryData = req.body;

  try {
    // انتظر حتى يتم الانتهاء من البحث عن الفئة
    const isExists = await Categorey.find({ name: categoryData.name });

    if (isExists.length > 0) {
      res.status(400).json({ error: 'Category already exists' });
    } else {
      // إنشاء الفئة وحفظها
      const category = new Categorey(categoryData);
      await category.save();

      // إرجاع البيانات مع رمز الحالة 201
      res.status(201).json(category);
    }
  } catch (error) {
    // في حالة حدوث أي خطأ، أرجعها كاستجابة 400 مع الخطأ
    res.status(400).json({ error: error.message });
  }
};



  const ubdateblog = (req, res) => {
    const id = req.params.id;
    const updatedCategorey = req.body;

  Categorey.findByIdAndUpdate(id, updatedCategorey)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      res.status(500).json();
    });
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorey.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Not Found' });
  }
};


const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Categorey.findOne({ _id: categoryId });

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Not Found' });
  }
};


const getCategoriesByEnum = async (req, res) => {
  const enumValue = req.params

  try {
    const categories = await Categorey.find({ name: enumValue });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Not Found' });
  }
};



module.exports = {
    postCategorey,
    deleteCategorey,
    ubdateblog,
    getAllCategories,
    getCategoryById,
    getCategoriesByEnum
}

