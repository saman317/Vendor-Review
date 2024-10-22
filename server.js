const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require("bcrypt");
const vendorController = require("./controllers/vendors.js")
const isSignedIn= require("./middleware/is-signed-in.js")
const passUserToView=require("./middleware/pass-user-to-view.js")
const MongoStore = require("connect-mongo")
const path=require("path");

const authController = require('./controllers/auth.js');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    })
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});


app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn);
app.use("/users/:userId/vendors",(req,res,next)=>{(req.userId=req.params.userId);next()}, vendorController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});