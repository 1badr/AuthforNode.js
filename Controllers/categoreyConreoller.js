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
    const Categoreys = new Categorey(req.body);
    Categoreys.save()
      .then((result) => {
        res.status(201).json({ Categoreys: Categoreys._id });
      });
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



module.exports = {
    postCategorey,
    deleteCategorey,
    ubdateblog
}

