var express = require('express');
const app = express();
const authRoutes = require ('./routes/authRoutes');
const mongoose = require('mongoose');
const cookiePareser = require('cookie-parser');
const { requireAuth } = require('./middleware/auth.middleware');
app.use(express.json());
app.use(cookiePareser());
mongoose.connect("mongodb://localhost:27017/admin", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


app.get('/', function (req, res) {
 res.send('Hello World');
})
var server = app.listen(3000, function () {
 var host = server.address().address
 var port = server.address().port
 console.log("Example app listening at http://%s:%s", host, port)
})

app.use(authRoutes);

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