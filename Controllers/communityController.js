const Blogs = require('../models/Blogs');
const Community = require ('../models/Community');
const User = require ('../models/User');
const CV = require ('../models/CV');

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

    const getCommuById = async (req, res) => {
      try {
        const commuId = req.params.id; // استخراج الهوية (ID) من الطلب
        const commu = await Community.findById(commuId);
        
        if (!commu) {
          return res.status(404).json({ message: 'Community not found' });
        }
        
        return res.status(200).json({ commu });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Failed to get community' });
      }
    };

    const getArticlesUserByType = async (req, res) => {
      try {
        // Fetch all the blogs with a 'user' type and populate the author field
        const articles = await Blogs.find({ type: 'user' }).populate('author');
    
        // Create an array of blog objects with the desired data
        const articlesWithUserData = await Promise.all(articles.map(async (article) => {
          const authorData = article.author;
          if (authorData) {
            return {
              id: article._id,
              title: article.title,
              body: article.body,
              category: article.Categorey,
              likes: article.likes,
              comment: article.comment,
              saves: article.saves,
              communityID: article.communityID,
              author: {
                id: authorData.userID,
                name: authorData.fullName,
                image: authorData.cv_image
              }
            };
          } else {
            return {
              id: article._id,
              title: article.title,
              body: article.body,
              category: article.Categorey,
              likes: article.likes,
              comment: article.comment,
              saves: article.saves,
              communityID: article.communityID,
              author: {
                id: null,
                name: 'Unknown',
                image: null
              }
            };
          }
        }));
    
        return res.status(200).json(articlesWithUserData);
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Failed to get articles by type' });
      }
    };
    const getArticlesCompanyByType = async (req, res) => {
      try {
        const articles = await Blogs.find({ type: 'company' });
        return res.status(200).json({ articles });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Failed to get articles by type' });
      }
    };

    const getArticlesCompanyByTypeCompany = async (req, res) => {
      try {
        const communityId = req.params.communityId; // استرجاع الايدي حق المجتمع من قام بالاستدعاء
    
        const articles = await Blogs.find({ type: 'company', communityId });
        return res.status(200).json({ articles });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Failed to get articles by type' });
      }
    };

    const getArticlesCompanyByTypeUser = async (req, res) => {
      try {
        const communityId = req.params.communityId; // استرجاع الايدي حق المجتمع من قام بالاستدعاء
    
        const articles = await Blogs.find({ type: 'user', communityId });
        return res.status(200).json({ articles });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Failed to get articles by type' });
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
    getArticlesUserByType,
    getCommuById,
    getArticlesCompanyByType,
    getArticlesCompanyByTypeCompany,
    getArticlesCompanyByTypeUser,
}

