const express = require('express');
const router = express.Router();
//este pool hace referenia a la base de datos OJO
//  (../) es para subir dos niveles e ir a database
const pool =require('../database');
const {isLoggedIn} = require('../lib/auth');

// locahost:4000/links....
router.get('/add', isLoggedIn, (req, res) => {
    //res.send('Form');
    //res.render('/links/add');
    res.render('trackers/add');

});

router.post('/add', isLoggedIn, async(req, res) => {
    console.log(req.body);  // puedos mostrar en consola  erro de enlace entre trackers y usss, title, users
    const { tracker_code, tracker_cell_number, tracker_obs } = req.body;
    const newtracker = {
        tracker_code,
        tracker_cell_number,
        tracker_obs,
        user_id: req.user.id//seguro a cambiar
    };
    await pool.query('INSERT INTO tracker set ?', [newtracker]);
    console.log(newtracker);
    //res.send('RECIBIDO');
    //para que exista un mensaje guardado de buena forma
    req.flash('success', 'Tracker  guardado satisfactoriamente');
     res.redirect('/trackers');

});
//para mostrar 
router.get('/', isLoggedIn, async (req, res) => {
    const tracker = await pool.query('SELECT * FROM tracker WHERE user_id=?',[req.user.id]);//parte de users ID que manda a otros niveles
    console.log(tracker);
    //res.send('las listas estan aqui');
    res.render('trackers/list', {tracker});
});

router.get('/delete/:id_tracker',isLoggedIn, async (req, res) => {
    //console.log(req.params.id_tracker); //para comprobar
    const { id_tracker } = req.params;
    await pool.query('DELETE FROM tracker WHERE id_tracker = ?', [id_tracker]);
    req.flash('success', 'Removido ');
    res.redirect('/trackers');
    res.send('DELETED - REEEE');
});

router.get('/edit/:id_tracker', isLoggedIn, async (req, res) => {
    const { id_tracker } = req.params;
    //console.log(id_tracker);
    //res.send('Recividisiomo para EDIT');
    //para poblar la lista
    const tracker =  await pool.query('SELECT * FROM tracker WHERE id_tracker = ?', [id_tracker]);
    //console.log(links[0]);
    //1:44:30
    res.render('trackers/edit', {tracker: tracker[0]});
});

router.post('/edit/:id_tracker', isLoggedIn, async(req, res) => {
    const { id_tracker } = req.params;
    const { tracker_code, tracker_cell_number, tracker_obs } = req.body;
    const newtracker = {
        tracker_code,
        tracker_cell_number,
        tracker_obs
    };
    console.log(newtracker);
    await pool.query( 'UPDATE tracker set ? WHERE id_tracker = ?', [newtracker, id_tracker]);
    req.flash('success', 'Tracker Actualizado...')
    res.redirect('/trackers');
});



module.exports = router;