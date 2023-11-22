const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) { 
        console.log( new Date(), errors.mapped() );
        return res.status(400).json({ ok: false, errors: errors.mapped() });
    }

    next();
}


module.exports = {
    validarCampos
}

