var express = require('express');
const app = express();
app.use(express.json());
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')
const Keys = require('./config/Keys')
const router = express.Router();

app.set('view engine', 'ejs');

app.use(passport.initialize());
const { client } = require('websocket');
//const  { WebSocketServer, WebSocket } = require('ws');


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
const dashpoardRoutes = require("./routes/Admin/dashpoardRoutes");
const pusherChatRoute = require("./routes/pusherChatRoute");



const mongoose = require('mongoose');
const cookiePareser = require('cookie-parser');
const { requireAuth } = require('./middleware/auth.middleware');
app.use(cookiePareser());
const nodemailer = require("nodemailer");
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


mongoose.connect("mongodb://localhost:27017/levelfive", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
////
/////

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
app.use('/dashpoard',dashpoardRoutes);
app.use('/pusherChatRoute',pusherChatRoute);




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


const Router = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});


const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

app.post('/user', handleMultipartData, function(req, res) {
  try {
    // تتوفر الآن بيانات النموذج والملف في `req.body` و `req.file` على التوالي
    res.json({
      body: req.body,
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ في الخادم' });
  }
});


var server = app.listen(8000,"0.0.0.0", function () {
 var host = server.address().address
 var port = server.address().port
 console.log("Example app listening at http://%s:%s", host, port)
});
