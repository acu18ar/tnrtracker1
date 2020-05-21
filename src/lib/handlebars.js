// para que funcione algunas bilbiotecas como timeagapp.use(bodyParser.json());

const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    console.log(timestamp);
    return format(timestamp);
};


module.exports = helpers;
