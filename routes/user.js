const passport = require("passport");
const router = require('express').Router()
const {register, login, loginnew, logout, myProfile, allUsers, allStats} = require('../Controllers/user')
const {isAuth, isAdmin}= require("../Utils/isauth")
router.post('/register', register);
// router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), login);
router.post('/login', loginnew);
router.get('/login', (req, res)=>{
    res.render('login');
});
router.get('/logout', logout);
router.get('/me', isAuth, myProfile);

// Admin Routes
router.get("/admin/users", isAuth, isAdmin, allUsers);
router.get("/admin/stats", isAuth, isAdmin, allStats);

module.exports = router;