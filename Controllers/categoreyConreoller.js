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

  if (['Program', 'Desgin', 'Medical', 'Mangment'].includes(categoryData.name)) {
    const category = new Categorey(categoryData);
    category.save()
      .then((result) => {
        res.status(201).json({ category: category._id });
      });
  } else {
    res.status(400).json({ error: 'Invalid category name' });
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
    res.status(500).json({ error: 'Failed to fetch categories' });
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
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};


const getCategoriesByEnum = async (req, res) => {
  const enumValue = req.params

  try {
    const categories = await Categorey.find({ name: enumValue });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'فشل في استرداد التصنيفات' });
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

