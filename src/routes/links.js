const express = require('express');
const router = express.Router();
//este pool hace referenia a la base de datos OJO
//  (../) es para subir dos niveles e ir a database
const pool =require('../database');

module.exports = router;