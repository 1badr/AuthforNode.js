
const Jobs = require('../models/Jobs');
const Comments = require('../models/Comments');
const Blogs = require('../models/Blogs');
const reporters = require('../models/report');
const User = require('../models/User');

const createReport = async (req, res) => {
  try {
    const { reporter, reportedID, reportType, description, evidence, resolved } = req.body;

    // بحث عن المستخدم المبلغ عنه في جداول مختلفة
    let reportedEntity;
    let entityType;
    reportedEntity = await Jobs.findById(reportedID);
    if (!reportedEntity) {
      reportedEntity = await Blogs.findById(reportedID);
      entityType = 'blog';
    }
    if (!reportedEntity) {
      reportedEntity = await Comments.findById(reportedID);
      entityType = 'comment';
    }

    // إذا لم يتم العثور على المستخدم المبلغ عنه، أرجع رسالة خطأ
    if (!reportedEntity) {
      return res.status(404).json({ message: 'المستخدم المبلغ عنه غير موجود' });
    }

    // إنشاء التقرير الجديد
    const report = await reporters.create({
      reporter,
      reportedID,
      reportType,
      description,
      evidence,
      resolved,
      entityType
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


 
  const getUserReports = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const reports = await reporters.find({ reporter: userId });
  
      if (reports.length > 0) {
        res.json(reports);
      } else {
        res.status(404).json({ error: 'No reports found for this user' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  };


  const getReports = async (req, res) => {
    try {
      const reports = await reporters.find({});
  
      if (reports.length > 0) {
        res.json(reports);
      } else {
        res.status(404).json({ error: 'No reports found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  };  

  const getTrueReports = async (req, res) => {
    try {
      const reports = await reporters.find({ resolved: true });
  
      if (reports.length > 0) {
        res.json(reports);
      } else {
        res.status(404).json({ error: 'No active reports found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  };


  const getFalseReports = async (req, res) => {
    try {
      const reports = await reporters.find({ resolved: false });
  
      if (reports.length > 0) {
        res.json(reports);
      } else {
        res.status(404).json({ error: 'No active reports found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  };



  module.exports = {
    createReport,
    getUserReports,
    getReports,
    getTrueReports,
    getFalseReports
  };