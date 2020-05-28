const express = require('express');
const router = express.Router();
// const passport = require('../lib/passport'); //error con las rutas... OJO
const passport = require('passport');


router.get('/signup', (req,res) => {
    res.render('auth/signup');
});

/* router.post('/signup', (req, res) => {

    //console.log(req.body);
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFash: true
    })
    res.send('received');
}); */

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect: '/signin',
        failureFash: true
    })(req, res, next);
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFash: true
}));


router.get('/profile', (req, res) => {
    
});
module.exports = router;