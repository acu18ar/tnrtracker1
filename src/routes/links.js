const express = require('express');
const router = express.Router();
//este pool hace referenia a la base de datos OJO
//  (../) es para subir dos niveles e ir a database
const pool =require('../database');
const {isLoggedIn} = require('../lib/auth');
// para las rutas de las vistas para pedir al servidor

// locahost:4000/links....
router.get('/add', isLoggedIn, (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('links/add');

});

router.post('/add', isLoggedIn, async(req, res) => {
    //console.log(req.body);  // puedos mostrar en consola  
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    //pool.query('INSERT INTO links set ?, [newLink]'); //una peticion comun abajo esta con promes
    await pool.query('INSERT INTO links set ?', [newLink]);
    console.log(newLink);
    //res.send('RECIBIDO');
    //para que exista un mensaje guardado de buena forma
    req.flash('success', 'Link guardado satisfactoriamente');
     res.redirect('/links');

});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id=?',[req.user.id]);
    console.log(links);
    //res.send('las listas estan aqui');
    res.render('links/list', {links});
});

router.get('/delete/:id_links',isLoggedIn, async (req, res) => {
    //console.log(req.params.id_links); //para comprobar
    const { id_links } = req.params;
    await pool.query('DELETE FROM links WHERE id_links = ?', [id_links]);
    req.flash('success', 'Removido ');
    res.redirect('/links');
    res.send('DELETED - REEEE');
});

router.get('/edit/:id_links', isLoggedIn, async (req, res) => {
    const { id_links } = req.params;
    //console.log(id_links);
    //res.send('Recividisiomo para EDIT');
    //para poblar la lista
    const links =  await pool.query('SELECT * FROM links WHERE id_links = ?', [id_links]);
    //console.log(links[0]);
    //1:44:30
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id_links', isLoggedIn, async(req, res) => {
    const { id_links } = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    console.log(newLink);
    await pool.query( 'UPDATE links set ? WHERE id_links = ?', [newLink, id_links]);
    req.flash('success', 'Link Actualizado...')
    res.redirect('/links');
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