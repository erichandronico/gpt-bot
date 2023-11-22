/*
    Ruta /chats
*/
const { Router }                                = require('express');
const { check }                                 = require('express-validator')
const { validarCampos }                         = require('../middlewares/validar-campos');

const { getChats, newChat, delChats } = require('../controllers/customerChat');

const router = Router();


router.get('/', getChats );

router.post('/',
    [
        check('chat', 'Chat requerido').not().isEmpty(),
        validarCampos
    ],
    newChat
);

router.delete('/', delChats );


module.exports = router;
