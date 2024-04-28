const Community = require ('../models/Community');
const User = require ('../models/User');

const postCommu = async (req, res) => {
  const comm = new Community(req.body);
  comm.save()
    .then((result) => {
      res.status(201).json({ comm: comm._id });
    });
};

    const postUsers = async (req, res) => {
        const user = new User(req.body);
        CVs.save()
        .then((result) => {
            res.status(201).json({ user: user._id });
        });
    };


    const searchInCommunity = async (req, res) => {
        try {
          const searchQuery = req.query.q;
          const cumm = await Community.find({ name: { $regex: searchQuery, $options: 'i' } })
          const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } })

          res.status(200).json({cumm,users});
        } catch (error) {
          res.status(500).json({ error: 'حدث خطأ أثناء البحث' });
        }
      };
      

      const deleteCommu = async (req,res) => {
        const id = req.params.id ;
      
        Community.findByIdAndDelete(id)
        .then(result => {
          console.log("delete")
          res.status(200).json();
        })
        .catch(err => {
          console.log(err);
        })
      };
      



      const deleteUser = (req, res) => {
        const id = req.params.id ;
      
        User.findByIdAndDelete(id)
        .then(result => {
          res.json();
        })
        .catch(err => {
          console.log(err);
        })
      };
      

      const AllCommu = async (req,res) => {
        try {
        commu = await Community.find()
        return res.status(200).json({commu});
      }
      catch (e){
        console.log(e.message)
      }
    };

    const AllUsers = async (req,res) => {
        try {
        usersCount =await User.count()
        users = await User.find()
        return res.status(200).json({users,usersCount});
      }
      catch (e){
        console.log(e.message)
      }
    };

  

module.exports = {
    postCommu,
    postUsers,
    searchInCommunity,
    deleteCommu,
    deleteUser,
    AllUsers,
    AllCommu,
}

