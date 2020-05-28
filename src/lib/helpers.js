//para muchos METODOS
const bcrypt = require('bcryptjs');

const helpers ={};



// para el cifrado
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;

};

helpers.matchPassword1 = async (password, savedPassword)  =>{
    //await bcrypt.compare(password, savedPassword);
    try{
        return await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
};


module.exports = helpers;