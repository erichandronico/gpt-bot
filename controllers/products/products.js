const { Product } = require("../../database/collections")
const { catchError, responseCallback } = require("../../helpers/responses");
const { newProductFn, updProductFn } = require("./productsFns");



// FUNCIONES PARA SERVICIO REST
//Obtiene los productos
const getProducts = (req, res) => Product.find( req?.query ?? {}, responseCallback(res) );

//Nuevos Productos
const newProduct =  (req, res) => {
    try {
        const response = newProductFn(req.body)
        res.json(response);
    } catch (error) {
        catchError( res, error)
    }
}

//Actualiza un producto
const updProduct = (req, res) => {
    try {
        const response = updProductFn({_id: req.params, data: req.body});
        res.json(response);
    } catch (error) {
        catchError( res, error)
    }
}



module.exports = {
    getProducts,
    newProduct,
    updProduct
}