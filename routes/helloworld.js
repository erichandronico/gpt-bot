/*
    Ruta /
*/
const { Router }            = require('express');
const { getHelloWorld }     = require('../controllers/helloworld');

const router = Router();

router.get( '/', getHelloWorld );

module.exports = router;
