const express = require('express');
const router = express.Router();
//este pool hace referenia a la base de datos OJO
//  (../) es para subir dos niveles e ir a database
const pool =require('../database');

// para las rutas de las vistas para pedir al servidor

// locahost:4000/links....
router.get('/add', (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('links/add');

});

router.post('/add', (req, res) => {
    res.send('RECIBIDO');

});

router.get('/tracker1', (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('links/tracker1');

});
router.post('/tracker1', (req, res) => {
    res.send('No Molestes');

});



module.exports = router;