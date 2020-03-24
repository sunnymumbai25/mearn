const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const cors = require("cors");



app.use(cors());

app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader(
   "Access-Control-Allow-Methods",
   "GET,HEAD,OPTIONS,POST,PUT,DELETE"
);
res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
);
if (req.method === "OPTIONS") {
return res.status(200).end();
}
next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //DB Config
const db =require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
   .connect(db, { useNewUrlParser: true })
   .then(()=>console.log('MongoDB connected'))
   .catch(err=>console.log(err));

//app.get('/', (req, res) => res.send('hello world')); 

//passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
 
//user Routes
app.use('/api/users',users); 
app.use('/api/profile',profile); 
app.use('/api/posts', posts); 

const port = process.env.port||5000;

app.listen(port,()=> console.log(`server runing on port ${port}`));
