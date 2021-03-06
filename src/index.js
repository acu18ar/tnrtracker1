//const app = express();
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');
const bodyParser = require('body-parser');



const{ database } = require('./keys');

//inizializaciones...

const app = express();
require('./lib/passport');

//configurar
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//para el origen
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.set('port', process.env.PORT || 4000);
//app.set('views', path.join(__dirname, 'views'))
// ///HANDELSBARS
/*app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    sidebarDir: path.join(app.get('views'),  'sidebar'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));*/

//app.set('view engine', '.hbs');
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
    //app.locals.success = req.flash('success');
    //app.locals.message = req.flash('message');
    app.locals.user = req.user;
   // app.locals.title = req.title;//para el cargo
    //app.locals.buques = req.buques;//para buques
    //app.locals.tracker = req.tracker;//para rastreador
    next();
}));

// ROutes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/captcha'))
//app.use('/links', require('./routes/links'));
//app.use('/buques', require('./routes/buques'));
// app.use('/crew', require('./routes/crew'));
// app.use('/trackers', require('./routes/trackers'));
app.use('/users', require('./routes/users'));

/*app.use('/title', require('./routes/title'));
*/

//publics
//app.use(express.static(path.join(__dirname, 'public')));
//starting server

app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'))
});

