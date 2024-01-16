var express = require('express');
const app = express();
app.use(express.json());

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
const voteRoute = require('./routes/voteRoute');
const followersRoute = require('./routes/followersRoute');



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
app.use('/vote',voteRoute);
app.use('/follo',followersRoute);




app.use(cors({
  origin: "http://localhost:3000",
}));


// Define API routes
app.get("/api", (req, res) => {
  res.send("API is running");
});



app.get("/users", (req, res) => {
  const users = getRoomUsers("room1"); // Replace "room1" with the actual room name
  res.json(users);
});



/**================================================== */
var io = require("socket.io")(server);

var clients ={};

io.on('connection', (socket) =>{
  console.log('connected');
  console.log(socket.id ,"has join");
  socket.on('signin',(id) =>{
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on('message', (msg) =>{
    console.log(msg)
    let targetID = msg.targetID;
    if (clients[targetID]) clients[targetID].emit('message',msg);
  });
});


/**================================================== */





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
