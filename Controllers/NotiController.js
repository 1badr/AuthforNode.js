var express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Noti = require ('../models/Notifications');
const CV = require ('../models/CV');

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
	  
function startServer() {
	const http = require("http").createServer();
	const io = require("socket.io")(http);
  
	http.listen(3001, function() {
	  console.log("Connected");
	});
	io.on("connection", function(socket) {
		console.log("Auth value: " + socket.id);
	  
		socket.on("sendNotification", function(data) {
		  const CompanyID = data.CompanyID;
		  const details = data.CV;
		  console.log("Send CV");
	  
		  io.to(CompanyID).emit("sendNotification", details);
		});
	  });
  }
  

const notiJob = () => {
	
io.on("connection", (socket) => {
	console.log("Connected: " + socket.id);
  
	socket.on("acceptRequest", (requestId) => {

		socket.on("rejectRequest", (requestId) => {
			Notifications.findOneAndUpdate(
				{ _id: notificationId }, 
				{ accepted: true }, 
				{ new: true }
			  )
			  .then(updatedNotification => {
				console.log("تم تحديث حالة الإشعار بنجاح",updatedNotification);
			  })
			  .catch(error => {
				console.error("حدث خطأ أثناء تحديث الحالة", error);
			  });
		  io.to(requestId).emit("notification", "تم رفض طلبك.");
		});	  io.to(requestId).emit("notification", "تم قبول طلبك.");
	});
  
	socket.on("rejectRequest", (requestId) => {

		socket.on("rejectRequest", (requestId) => {
			Notifications.findOneAndUpdate(
				{ _id: notificationId }, 
				{ accepted: false }, 
				{ new: true }
			  )
			  .then(updatedNotification => {
				console.log("تم تحديث حالة الإشعار بنجاح",updatedNotification);
			  })
			  .catch(error => {
				console.error("حدث خطأ أثناء تحديث الحالة", error);
			  });

		  io.to(requestId).emit("notification", "تم رفض طلبك.");
		});	  io.to(requestId).emit("notification", "تم رفض طلبك.");
	});
  
	socket.on("disconnect", () => {
	  console.log("Disconnected: " + socket.id);
	});
  });
  
  server.listen(3002, () => {
	console.log("noti job is connect ");
  });
	
}


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
    users = await Noti.find()
    return res.status(200).json({users});
  }
  catch (e){
    console.log(e.message)
  }
};

module.exports = {
	getNotificationsCount,
	startServer,
	notiJob,
	deleteNoti,
	AllNoti,
};