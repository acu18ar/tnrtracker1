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

router.post('/add', async(req, res) => {
    //console.log(req.body);  // puedos mostrar en consola  
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    //pool.query('INSERT INTO links set ?, [newLink]'); //una peticion comun abajo esta con promes
    await pool.query('INSERT INTO links set ?', [newLink]);
    console.log(newLink);
    //res.send('RECIBIDO');
     res.redirect('/links');

});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    //res.send('las listas estan aqui');
    res.render('links/list', {links});
});


//para el tracker

router.get('/tracker1', (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('links/tracker1');

});
router.post('/tracker1', (req, res) => {
    res.send('No Molestes');

});



module.exports = router;