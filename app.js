var express = require('express');
const app = express();
app.use(express.json());
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')
const Keys = require('./config/Keys')
const router = express.Router();


app.use(passport.initialize());



const authRoutes = require ('./routes/authRoutes');
const CategoreyRoutes = require('./routes/categoreyRoutes');
const CommentRoutes = require('./routes/commentRoutes');
const CVRoutes = require('./routes/Admin/CVRoutes');
const JobsRoutes = require('./routes/Admin/JobsRoutes');
const BlogRoutes = require('./routes/blogRoutes');
const usersRoutes = require('./routes/Admin/usersRoutes');
const NotiRoutes = require('./routes/NotiRoutes');
const searchRoutes = require('./routes/searchRoutes');
const CommunityRoutes = require('./routes/CommunityRoutes');
const likeRoute = require('./routes/likeRoute');
const followersRoute = require('./routes/followersRoute');
const conversationRoute = require("./routes/conversationsRoutes");
const messageRoute = require("./routes/messagesRoutes");
const NotificationRealTimeRoute = require("./routes/NotificationRealTimeController");
const CompanyRoutes = require("./routes/CompanyRoutes");
const favRoutes = require("./routes/favRoutes");
const SavesRoute = require("./routes/SavesRoute");
const quizRoute = require("./routes/quizRoute");



const mongoose = require('mongoose');
const cookiePareser = require('cookie-parser');
const { requireAuth } = require('./middleware/auth.middleware');
app.use(cookiePareser());
const nodemailer = require("nodemailer");
const cors = require('cors');




mongoose.connect("mongodb://localhost:27017/levelfive", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


app.use('/user',authRoutes);
app.use('/categoery',CategoreyRoutes);
app.use('/comment',CommentRoutes);
app.use('/CV',CVRoutes);
app.use('/job',JobsRoutes);
app.use('/blog',BlogRoutes);
app.use('/users',usersRoutes);
app.use('/Noti',NotiRoutes);
app.use('/search',searchRoutes);
app.use('/comm',CommunityRoutes);
app.use('/like',likeRoute);
app.use('/follo',followersRoute);
app.use('/conversation',conversationRoute);
app.use('/message',messageRoute);
app.use('/NotificationRealTimeRoute',NotificationRealTimeRoute);
app.use('/Company',CompanyRoutes);
app.use('/fav',favRoutes);
app.use('/save',SavesRoute);
app.use('/quiz',quizRoute);




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



///========================================================
//auth google provider
app.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.json();
});
//=========================================================
// Define API routes
app.get("/api", (req, res) => {
  res.send("API is running");
});



app.get("/users", (req, res) => {
  const users = getRoomUsers("room1"); // Replace "room1" with the actual room name
  res.json(users);
});



/**================================================== */
const io = require("socket.io")(8000, {
  
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

/**================================================== */

/*======================================================*/
let notifications = [];

const addNotification = (notificationId, socketId) => {
  !notifications.some((notification) => notification.notificationId === notificationId) &&
    notifications.push({ notificationId, socketId });
};

const removeNotification = (socketId) => {
  notifications = notifications.filter((notification) => notification.socketId !== socketId);
};

const getNotification = (notificationId) => {
  return notifications.find((notification) => notification.notificationId === notificationId);
};

io.on("connection", (socket) => {
  console.log("تم اتصال مستخدم.");

  socket.on("addNotification", (notificationId) => {
    addNotification(notificationId, socket.id);
    io.emit("getNotifications", notifications);
  });

  socket.on("sendNotification", ({ userId, companyId, text }) => {
    const notification = getNotification(receiverId);
    io.to(notification.socketId).emit("receiveNotification", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("تم انفصال مستخدم!");
    removeNotification(socket.id);
    io.emit("getNotifications", notifications);
  });
});




/*======================================================*/



app.get('/mail', async (req, res) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      auth: {
        user: '570e8cfa94ab57',
        pass: 'fb1927afb97377'
      },
      tls: {
        rejectUnauthorized: false // Add this line to disable certificate verification
      }
    });



    // Send mail with defined transport object
    const info = await transport.sendMail({
      from: 'info@mailtrao.club', // Sender address
      to: 'badr@gmail.com', // List of receivers
      subject: 'Hello badr hussin', // Subject line
      text: 'Hello naddooorryy', // Plain text body
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});


app.get('/set-cookie',(req,res)=>{
  req.logOut()
});


app.get('/set-cookie',(req,res)=>{
   res.cookie('new user',false);
   res.cookie('isEmployee',false,{maxAge:1000*60*60*24,secure:true,httpOnly:true});

   res.send('you took the cookie'); 
});

app.get('/read-cookie',(req,res)=>{
   const cookie = req.cookies;
   console.log(cookie);
   res.json(cookie);

});


app.get('/', function (req, res) {
 res.send('Hello World');
});


var server = app.listen(8000,"0.0.0.0", function () {
 var host = server.address().address
 var port = server.address().port
 console.log("Example app listening at http://%s:%s", host, port)
});
