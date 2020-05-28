// para definir los metodos de authenticacion.
// ppara que puedas acceder con google facebook u otras cuentas... ojo

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

//PARA SIGN IN

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=> {
    console.log(req.body);
    //console.log(username);
    //console.log(password);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0){
        const user = rows[0];
        // comparar contrasenas
        const validPassword = await helpers.matchPassword1(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','WELDONE '+ user.username));
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }else{
        return done(null, false, req.flash('message','Usuario inexistente'));
    }
}));

//para SIGN UP
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const { fullname } = req.body;
    //console.log(req.body);
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    //console.log(result);
    return done(null, newUser);
}));


passport.serializeUser((user, done)=>{
    done(null, user.id);

});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});