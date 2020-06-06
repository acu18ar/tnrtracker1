
const express = require('express');
const router = express.Router();
//este pool hace referenia a la base de datos OJO
//  (../) es para subir dos niveles e ir a database
const pool =require('../database');
const {isLoggedIn} = require('../lib/auth');
// para las rutas de las vistas para pedir al servidor

// locahost:4000/links....
router.get('/add', isLoggedIn, async(req, res) => {

    const titles = await pool.query('SELECT * FROM title'); //WHERE user_id=?',[req.user.id]
    res.render('crew/add', {titles});

});

router.post('/add', isLoggedIn, async(req, res) => {
    //console.log(req.body);  // puedos mostrar en consola  
    //const { id_crew } = req.params;
    const { comandante, segundocomandante, jefemaquinas, maquinista, timonel, segtimonel, crew, crew2 } = req.body;
    const {id_title} = req.body;
    const newcrew = {
        comandante,
        segundocomandante,
        jefemaquinas,
        maquinista,
        timonel,
        segtimonel,
        crew,
        crew2
    };
    //pool.query('INSERT INTO links set ?, [newLink]'); //una peticion comun abajo esta con promes
    const result = await pool.query('INSERT INTO crew set ?', [newcrew]);
    //console.log(newuuss);
    newcrew.id = result.insertId;
    const tis_cre = {
        title_id_title: id_title,
        crew_id_crew: newcrew.id
    }
    await pool.query('INSERT INTO crew_has_title SET ?',[tis_cre]);
    //res.send('RECIBIDO');
    //para que exista un mensaje guardado de buena forma

    req.flash('success', 'Tripulacion guardada Satisfactoriamente');
     res.redirect('/crew');

});

router.get('/', isLoggedIn, async (req, res) => {
    const title_id_user2 = await pool.query('SELECT * FROM title_user WHERE user_id_user=?',[req.user.id]);
    //console.log(title_id_user1[0].title_id_title);
    id_title = title_id_user2[0].title_id_title;
    const title_crew2 = await pool.query('SELECT * FROM crew_has_title WHERE title_id_title=?',[id_title]);
    const id_permited = [];
    title_crew2.forEach(element => {
        id_permited.push(element.crew_id_crew);
    });
    const crew = await pool.query('SELECT * FROM crew');
    const crew_list = [];
    crew.forEach(element => {
        if(id_permited.includes(element.id_crew)){
            crew_list.push(element);
        }
    });
    
    console.log(crew);
    //res.send('las listas estan aqui');
    //res.render('buques/list', {buques});
    console.log(id_permited);
    res.render('crew/list', {crew_list});
});

router.get('/delete/:id_crew',isLoggedIn, async (req, res) => {
    //console.log(req.params.id_links); //para comprobar
    const { id_crew } = req.params;
    await pool.query('DELETE FROM crew_has_title WHERE crew_id_crew = ?', [id_crew]);
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
    const newcrew = {
        comandante,
        segundocomandante,
        jefemaquinas,
        maquinista,
        timonel,
        segtimonel,
        crew,
        crew2
    };
    console.log(newcrew);
    await pool.query( 'UPDATE crew set ? WHERE id_crew = ?', [newcrew, id_crew]);
    req.flash('success', 'CREW Actualizado...')
    res.redirect('/crew');
});


//para el tracker

router.get('/tracker1', (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('buques/tracker1');

});
router.post('/tracker1', (req, res) => {
    res.send('No Molestes');

});



module.exports = router;

