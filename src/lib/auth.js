// para comprobar si el usuario esta logueado o no

module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        return  res.redirect('/signin');
    },

    //el proceso inverso para que el usuario novisite otras rutas...
    isNotLoggedin(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return  res.redirect('/profile' );
    }
};