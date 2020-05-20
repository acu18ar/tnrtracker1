const mysql = require('mysql');
// para que funcione las promesas y que sea reactivo....
const { promisify } = require('util');

const { database } = require('./keys');

// generar una conexcion.
const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNETION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTION');
        }
        if (err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }

    }
    if (connection) connection.release();
    console.log('DATABASE is Connected');
    return;
});
// query es consultas para que sean ASYN AWAIT
// promisify pool  querys
pool.query = promisify(pool.query);

// para empesar a hacer las consultas...
module.exports = pool;