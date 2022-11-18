const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/users")

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password'},async (username,password,done)=>{
  const user = await User.findOne({username});
  //console.log(user.password)
  if(!user)done(err);
  if(password === user.password)done(null,user);
  else done(null,false);
}))
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});