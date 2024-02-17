const Favorite = require('../models/fav'); 
const toggleFavorite = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    const existingFavorite = await Favorite.findOne({ userId, blogId });

    if (existingFavorite) {
      await Favorite.deleteOne({ userId, blogId });
      res.json({ message: 'unFav' });
    } else {
      const favorite = new Favorite({ userId, blogId });
      await favorite.save();
      res.json({ message: 'Fav'});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  toggleFavorite,
};