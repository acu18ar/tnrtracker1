const express = require('express');
const router = express.Router();
const pool =require('../database');

// const passport = require('../lib/passport'); //error con las rutas... OJO
const passport = require('passport');
const{ isLoggedIn, isNotLoggedin } = require('../lib/auth');


router.get('/signup', isNotLoggedin, async (req,res) => {
    const titles = await pool.query('SELECT * FROM title'); //WHERE user_id=?',[req.user.id]
    res.render('auth/signup', {titles});
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


router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});
module.exports = router;
/*router.post('/signin', (req, res, next) => {
    const rows =  pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0){
        const user = rows[0];
        // comparar contrasenas
        //const validPassword = await helpers.matchPassword1(password, user.password);
        if(user){
            done (null, user, req.flash('success','WELDONE '+ user.username,authenticate('local.signin',{
                successRedirect:'/signpass',
                failureRedirect: '/signin',
                failureFash: true
            }))(req, res, next));

        }else{
            done(null, false, req.flash('message','Incorrect '));
        }
    }else{
        return done(null, false, req.flash('message','Usuario inexistente'));
    }

});*/