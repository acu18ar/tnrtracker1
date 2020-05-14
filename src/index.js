//const app = express();
const express = require('express');
const morgan = require('morgan');

const exphbs = require('express-handlebars');
const path = require('path');
//inizializaciones...

const app = express();

//configurar

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
// ///HANDELSBARS
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    exname: '.hbs',
    helpers: require('./lib/handlebars')

}));

app.set('view engine', '.hbs');
//middlewares -> funciones eecudadas para una peticin al server

app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//------ nos muestra que llega a la consola

//variables GLOBALES para ver en cualquier vista
app.use(((req, res, next)=>{
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

