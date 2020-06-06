//TRIPULACION =CREW
const express = require('express');
const router = express.Router();
//este pool hace referenia a la base de datos OJO
//  (../) es para subir dos niveles e ir a database
const pool =require('../database');
const {isLoggedIn} = require('../lib/auth');
// para las rutas de las vistas para pedir al servidor

// locahost:4000/crew....
router.get('/add', isLoggedIn, async(req, res) => {
    //const titles = await pool.query('SELECT * FROM crew'); //WHERE user_id=?',[req.user.id]
    res.render('crew/add');

});

router.post('/add', isLoggedIn, async(req, res) => {
    //console.log(req.body);  // puedos mostrar en consola  
    const { comandante, segundocomandante, jefemaquinas, maquinista, timonel, segtimonel, crew, crew2 } = req.body;
    //const {id_title} = req.body;
    const newcrew = {
        comandante,
        segundocomandante,
        jefemaquinas,
        maquinista,
        timonel,
        segtimonel,
        crew,
        crew2,
        user_id: req.user.id
    };
    //pool.query('INSERT INTO links set ?, [newLink]'); //una peticion comun abajo esta con promes
    const result = await pool.query('INSERT INTO crew set ?', [newcrew]);
    //console.log(newuuss);

    req.flash('success', 'Nueva Tripulacion guardada satisfactoriamente');
     res.redirect('/crew');

});

router.get('/', isLoggedIn, async (req, res) => {
    const crew = await pool.query('SELECT * FROM crew WHERE userc_id=?',[req.user.id]);
    console.log(crew);
    //res.send('las listas estan aqui');
    res.render('crew/list', {crew});
});
    

router.get('/delete/:id_crew',isLoggedIn, async (req, res) => {
    //console.log(req.params.id_links); //para comprobar
    const { id_crew } = req.params;
    await pool.query('DELETE FROM crew WHERE id_crew = ?', [id_crew]);

    
    req.flash('success', 'Removido ');
    res.redirect('/crew');
    res.send('DELETED - REEEE');
});

router.get('/edit/:id_crew', isLoggedIn, async (req, res) => {
    const { id_crew } = req.params;
    //console.log(id_links);
    //res.send('Recividisiomo para EDIT');
    //para poblar la lista
    const crew =  await pool.query('SELECT * FROM crew WHERE id_crew = ?', [id_crew]);
    //console.log(links[0]);
    //1:44:30
    res.render('crew/edit', {crew: crew[0]});
});

router.post('/edit/:id_crew', isLoggedIn, async(req, res) => {
    const { id_crew } = req.params;
    const { comandante, segundocomandante, jefemaquinas, maquinista, timonel, segtimonel, crew, crew2 } = req.body;
    //const {id_title} = req.body;
    const newcrew = {
        comandante,
        segundocomandante,
        jefemaquinas,
        maquinista,
        timonel,
        segtimonel,
        crew,
        crew2
//        user_id: req.user.id
    };
    console.log(newcrew);
    await pool.query( 'UPDATE crew set ? WHERE id_crew = ?', [newcrew, id_crew]);
    req.flash('success', 'Tripulaciones  Actualizado...')
    res.redirect('/crew');
});


//para el tracker

router.get('/tracker1', (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('uuss/tracker1');

});
router.post('/tracker1', (req, res) => {
    res.send('No Molestes');

});

module.exports = router;

