require('dotenv').config();
const express   = require('express');
const cors      = require('cors');

const helloWorldRouter = require('./routes/helloworld.js')
const productsRouter   = require('./routes/products.js')
const chatsRouter      = require('./routes/chats.js')

const app = express();
app.use( express.json() );
app.use( cors() )

const port = 9000;

app.use('/',            helloWorldRouter);
app.use('/products',    productsRouter);
app.use('/chats',       chatsRouter);


app.listen(port, () => console.log(`Servidor ejecutándose en http://localhost:${port}`));
