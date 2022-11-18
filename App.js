const express = require('express')
const urlencoded = require('express')
const bodyParser = require('body-parser')
const connectDb = require('./database/database')
const dotenv = require("dotenv");
const connectPassport = require("./Utils/Provider.js");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

//Database
connectDb();

//Middleware
dotenv.config({ path: "./Config/config.env"});
app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  urlencoded({
    extended: true,
  })
);
// app.use(session({ secret: "MySecretKey", resave: false, saveUninitialized: false,}));

//Passport
// app.use(passport.authenticate("session"));
// app.use(passport.initialize());
// app.use(passport.session());
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
app.use(session({ secret: "MySecretKey", resave: false, saveUninitialized: false, cookie: {
  // Session expires after 1 min of inactivity.
  expires: 6000000,
}}));
app.use(cookieParser());
// app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const router = require('./routes/user')
const order = require('./routes/order')
app.use("/api/v1",router);
app.use("/api/v1",order);
app.get("/",(req,res,next)=>{
    res.send("Working");
});

app.listen(4000,()=>{
    console.log('Server is Up...');
});