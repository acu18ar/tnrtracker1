const express = require('express');
const morgan = require('morgan');

//inizializaciones...

const app = express();

//configurar

app.set('port', process.env.PORT || 4000);

//middlewares -> funciones eecudadas para una peticin al server

app.use(morgan('dev')); // nos muestra que llega a la consola

//variables globales para ver en cualquier vista

// ROutes

//publics

//starting server



app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'))
});

