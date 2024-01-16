const { restart } = require('nodemon');
const CV = require ('../../models/CV');
const { result } = require('lodash');


const postCV = async (req, res) => {
    const CVs = new CV(req.body);
    CVs.save()
      .then((result) => {
        res.status(201).json({ CVs: CVs._id });
      });
  };

  
const deleteCV = async (req,res) => {
  const id = req.params.id ;

  CV.findByIdAndDelete(id)
  .then(result => {
    res.status(201).json();
  })
  .catch(err => {
    console.log(err);
  })
};



module.exports = {
    postCV,
    deleteCV
}

