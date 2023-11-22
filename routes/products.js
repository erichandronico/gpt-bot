/*
    Ruta /products
*/
const { Router }                        = require('express');
const { check }                         = require('express-validator')
const { validarCampos }                 = require('../middlewares/validar-campos');
const { newProduct, getProducts, updProduct }       = require('../controllers/products/products');

const router = Router();


router.get('/', getProducts );

router.post('/',
    [
        check('nombre', 'El nombre del producto es requerido').not().isEmpty(),
        validarCampos
    ],
    newProduct
);

router.put('/:_id',
    [
        check('_id', 'El _id del producto es requerido').not().isEmpty(),
        validarCampos
    ],
    updProduct
);



module.exports = router;
