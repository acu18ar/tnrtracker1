
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
    res.render('uuss/add', {titles});

});

router.post('/add', isLoggedIn, async(req, res) => {
    //console.log(req.body);  // puedos mostrar en consola  
    const { code_uuss, name_uuss, description } = req.body;
    const {id_title} = req.body;
    const newuuss = {
        code_uuss,
        name_uuss,
        description
//        user_id: req.user.id
    };
    //pool.query('INSERT INTO links set ?, [newLink]'); //una peticion comun abajo esta con promes
    const result = await pool.query('INSERT INTO uuss set ?', [newuuss]);
    //console.log(newuuss);
    newuuss.id = result.insertId;
    const tis_uss = {
        title_id_title: id_title,
        uuss_id_uuss: newuuss.id
    }
    await pool.query('INSERT INTO title_uuss SET ?',[tis_uss]);
    //res.send('RECIBIDO');
    //para que exista un mensaje guardado de buena forma
    req.flash('success', 'Unidad de Superficie guardado satisfactoriamente');
     res.redirect('/uuss');

});







router.get('/', isLoggedIn, async (req, res) => {
    const title_id_user1 = await pool.query('SELECT * FROM title_user WHERE user_id_user=?',[req.user.id]);
    //console.log(title_id_user1[0].title_id_title);
    id_title = title_id_user1[0].title_id_title;
    const title_uuss2 = await pool.query('SELECT * FROM title_uuss WHERE title_id_title=?',[id_title]);
    const id_permited = [];
    title_uuss2.forEach(element => {
        id_permited.push(element.uuss_id_uuss);
    });
    const uuss = await pool.query('SELECT * FROM uuss');
    const uuss_list = [];
    uuss.forEach(element => {
        if(id_permited.includes(element.id_uuss)){
            uuss_list.push(element);
        }
    });
    
    console.log(uuss);
    //res.send('las listas estan aqui');
    //res.render('uuss/list', {uuss});
    console.log(id_permited);
    res.render('uuss/list', {uuss_list});
});

router.get('/delete/:id_uuss',isLoggedIn, async (req, res) => {
    //console.log(req.params.id_links); //para comprobar
    console.log(req.params);
    //elimina ambos de la tabla, parece solo un chiste... 
    const { id_uuss } = req.params;
    await pool.query('DELETE FROM title_uuss WHERE id_title_uuss = ?', [id_uuss]);

    await pool.query('DELETE FROM uuss WHERE id_uuss = ?', [id_uuss]);



    req.flash('success', 'Removido ');
    res.redirect('/uuss');
    res.send('DELETED - REEEE');
});

router.get('/edit/:id_uuss', isLoggedIn, async (req, res) => {
    const { id_uuss } = req.params;
    //console.log(id_links);
    //res.send('Recividisiomo para EDIT');
    //para poblar la lista
    const uuss =  await pool.query('SELECT * FROM uuss WHERE id_uuss = ?', [id_uuss]);
    //console.log(links[0]);
    //1:44:30
    res.render('uuss/edit', {uuss: uuss[0]});
});

router.post('/edit/:id_uuss', isLoggedIn, async(req, res) => {
    const { id_uuss } = req.params;
    const { code_uuss, name_uuss, description} = req.body;
    const newuuss = {
        code_uuss,
        name_uuss,
        description
    };
    console.log(newuuss);
    await pool.query( 'UPDATE uuss set ? WHERE id_uuss = ?', [newuuss, id_uuss]);
    
    //current_uuss.id = result.insertId;
    /*const tis_cre = {
        title_id_title: id_title,
        crew_id_crew: current_uuss.id
    }*/
   // await pool.query('UPDATE title_uuss set ? WHERE id_title_uuss = ?',[tis_cre]);

        
    req.flash('success', 'UUSS Actualizado...')
    res.redirect('/uuss');
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

