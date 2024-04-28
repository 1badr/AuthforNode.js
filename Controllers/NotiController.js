var express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Noti = require ('../models/Notifications');
const CV = require ('../models/CV');
const User = require ('../models/User');
const Jobs = require('../models/Jobs');
const Requests = require('../models/Requests')
const server = require("http").createServer();

/* Queries the db to fetch the count of all unread notifications */

const getNotificationsCount = async (req,res) => {
		try {
			notCount =await Noti.count({'read': false}).exec();
			not = await Noti({'read': false});

		return res.status(200).json({notCount,not});
	  }
	  catch (e){
		console.log(e.message)
	  }
	};


const deleteNoti = (req,res) => {
	const id = req.params.id ;
  
	Noti.findByIdAndDelete(id)
	.then(result => {
	  res.status(201).json();
	})
	.catch(err => {
	  console.log(err);
	})
  };


  const AllNoti = async (req,res) => {
    try {
    noti = await Noti.find()
    return res.status(200).json({noti});
  }
  catch (e){
    console.log(e.message)
  }
};

const sendCVs = async (req, res) => {
	const newRqeuest = new Requests(req.body);

  try {
    const savedMessage = await newRqeuest.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
	getNotificationsCount,
	deleteNoti,
	AllNoti,
	sendCVs,
};