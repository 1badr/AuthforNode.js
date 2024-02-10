const Favorite = require('../models/fav'); // استيراد نموذج الجدول المفضل

const toggleFavorite = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    // البحث عن العنصر المفضل لحذفه إذا كان موجودًا
    const existingFavorite = await Favorite.findOne({ userId, blogId });

    if (existingFavorite) {
      // إذا وجدت العنصر المفضل بالفعل، قم بإزالته
      await Favorite.deleteOne({ userId, blogId });
      res.json({ message: 'تمت إزالة العنصر من القائمة المفضلة' });
    } else {
      // إنشاء سجل جديد في جدول المفضل
      const favorite = new Favorite({ userId, blogId });
      await favorite.save();
      res.json({ message: 'تمت إضافة العنصر إلى القائمة المفضلة بنجاح' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  toggleFavorite,
};