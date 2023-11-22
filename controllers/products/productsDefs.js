
const tool_get_products = {
    type: "function",
    function: {
        name: "get_products_fn",
        description: "Obtiene el nombre, color, precio y stock de los productos en venta",
        parameters: {
            type: "object",
            properties: {}
        }
    }
};


module.exports = {
    tool_get_products,    
}