const Datastore = require('nedb');

const newCollection = name => new Datastore({ filename: `database/files/${name}.db`, autoload: true })   //función para reducir código

// const products = new Datastore({ filename: 'files/products.db', autoload: true })    //método normal

const collections = {
    Product: newCollection('products'),
    Chat: newCollection('chats')
}



module.exports = collections