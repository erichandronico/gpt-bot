const { Product } = require("../../database/collections");
const { catchError, responseCallback, returnCallback } = require("../../helpers/responses");



// FUNCIONES QUE VAN A LA BASE DE DATOS
const getProductsFn = (filter={}) => {

    const promise = new Promise( (resolve, reject) => {

        Product.find( filter, (err, data) => {
            if (!err) return resolve ({ok: true, data})
            console.log(err)
            reject({ok: false, msg: 'Se produjo un error' })
        } );

    })
    return promise
}

const newProductFn  = data => {
    try {        
        const product = Product.insert(data);
        return {ok: true, msg: 'Producto Creado', tipo: 'sucesss', product}
    } catch (error) {
        return { ok: false, msg: 'Se produjo un error', tipo: 'error'}
    }
};

const updProductFn  = ({_id, data}) => {
    try {        
        const product = Product.update({_id}, {$set: data});
        return {ok: true, msg: 'Producto Actualizado', tipo: 'sucesss', product}
    } catch (error) {
        return { ok: false, msg: 'Se produjo un error al intentar actualizar el producto', tipo: 'error'}
    }
}

const getProductsMetodoLargo = (req, res) => {
    try {
        const filter = req?.query ?? {}

        Product.find(filter, (err, products) => {
            if (!err) return res.json({ok: true, products});
            catchError(res, err);
        });

    } catch (error) {
        catchError(res, error)
    }
};

const getProductsMetodoIntermedio = (req, res) => {
    try {
        const filter = req?.query ?? {}
        Product.find( filter, responseCallback(res) );
    } catch (error) {
        catchError(res, error)
    }
};




module.exports = {
    getProductsFn,
    newProductFn,
    updProductFn,
    getProductsMetodoLargo,
    getProductsMetodoIntermedio
}