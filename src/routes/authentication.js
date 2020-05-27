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

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFash: true
}));

router.get('/profile', (req, res) => {
    res.send('This is your Profile');
});
module.exports = router;