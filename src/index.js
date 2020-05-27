//const app = express();
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');

const{ database } = require('./keys');

//inizializaciones...

const app = express();
require('./lib/passport');

//configurar

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
// ///HANDELSBARS
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    sidebarDir: path.join(app.get('views'),  'sidebar'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));

app.set('view engine', '.hbs');
//middlewares -> funciones eecudadas para una peticin al server

app.use(session({
    secret:'anavya',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
        //para que passport funcione
app.use(passport.initialize());
app.use(passport.session());


//------ nos muestra que llega a la consola

//variables GLOBALES para ver en cualquier vista
app.use(((req, res, next)=>{
    app.locals.success = req.flash('success');
    next();
}));

// ROutes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//publics
app.use(express.static(path.join(__dirname, 'public')));
//starting server



app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'))
});

