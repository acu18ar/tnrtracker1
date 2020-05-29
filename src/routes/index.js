//para mostrar las rutas principales de la app

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
 //res.send('Hello word...')
     res.render('index');
});

module.exports = router;