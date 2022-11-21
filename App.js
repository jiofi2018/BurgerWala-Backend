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
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
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
  expires: 600000,
},}));
app.use(cookieParser());
// app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(function(req,res,next){
//   res.header('Access-Control-Allow-Credentials',true);
//   res.header('Access-Control-Allow-Origin','http://localhost:3000');
//   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//   res.header('Access-Control-Allow-Headers','X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
// })

// Routes
const router = require('./routes/user')
const order = require('./routes/order')
app.use("/api/v1",router);
app.use("/api/v1",order);
app.get("/",(req,res,next)=>{
    res.send("Working");
});

app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});