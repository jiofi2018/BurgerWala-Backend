const isAuth = (req, res, next) => {
    // console.log('req.cookies : ', req.cookies);

    // console.log('req.login', req.login);
    // console.log('req.isAuthenticated : ', req.isAuthenticated);
    // console.log('req.session', req.session);
    // console.log('req.user : ', req.user);
    // if (req.user) {
    if (req.session.username) {
      return next();
    } else {
      res.status(401).json({
        success: false,
        message: "You have to login first",
      });
      //res.redirect("/api/v1/login");
    }
  };

  const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "You have to login first",
      });
    }
    next();
  };
  module.exports = {isAuth, isAdmin};