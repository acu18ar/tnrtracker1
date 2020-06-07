// para definir los metodos de authenticacion.
// ppara que puedas acceder con google facebook u otras cuentas... ojo

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');



//PARA SIGN IN
passport.use('local.signin', new LocalStrategy({
  //  usernameField: 'username',
    // passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=> {
    console.log(req.body);
    console.log(username);
    console.log(password);
    console.log("hoja g");
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0){
        const user = rows[0];
         //comparar contrasenas
         const validPassword = await helpers.matchPassword1(password, user.password);
         if(validPassword){
            done(null, user);
         }else{
             done('contrasena invalida', null);
         }
    }else{
        return done(null, false, req.flash('message','Usuario inexistente'));
    }
}));

//para SIGN UP
passport.use('local.signup', new LocalStrategy({
    // usernameField: 'username',
    // passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    //const { username } = req.body;
    //const { password } = req.body;
    const { roleid } = req.body;
    const { email } = req.body;
    
    //console.log(req.body);
    const newUser = {
        username,
        password,
        email,
        roles_id_roles: roleid

        //falta created ad, y falta api_token
    };
    //"$2a$10$C0ID2Jm5y/IX98shBJlXlu4UT4/ZYH4ewQ2mfyGdSmB2ms96pQ75G"


    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    // newUser.id = result.insertId;
    // //console.log(id_title);
    // const {user_id_user}= newUser.id;
    // const {title_id_title}= id_title;
    // const tis = {
    //     user_id_user: newUser.id,
    //     title_id_title: id_title
    // }
    // console.log(tis);
    // const result2 = await pool.query('INSERT INTO title_user SET ?', [tis]);
    //const result2 = await pool.query('INSERT INTO title_user SET user_id_user = '+ newUser.id + ',title_id_title' + id_title);

    //console.log(result);
    return done(null, newUser);
}));

///////////////////////////para iniciar secion con solo usuario//////////////////////


//para dar lugar al ususario registrado
passport.serializeUser((user, done)=>{
    done(null, user.id);

});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});