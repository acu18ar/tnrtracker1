const express = require('express');
const router = express.Router();

const{ isLoggedIn, isNotLoggedin } = require('../lib/auth');

router.get('/captcha', isNotLoggedin, async (req,res) => {
    //res.send("hla mundo");
    res.status(200).send({   sitioWeb: "6LdxFAEVAAAAAJ-sXWB8H1s6Vjcaq2BmTJhQ2S0s",
                            claveSecreta: "6LdxFAEVAAAAAKf0XhncMVwWQl2qSIsYkX4pKKPz"});
    //almacer los tockes y enviar en json
    // sitio web: 6LdxFAEVAAAAAJ-sXWB8H1s6Vjcaq2BmTJhQ2S0s
    //secreta 6LdxFAEVAAAAAKf0XhncMVwWQl2qSIsYkX4pKKPz

});



module.exports = router;
