const _ = require('lodash')
const { Chat } = require("../database/collections");
const { startPrompt } = require("../helpers/prompts");
const { catchError, responseCallback } = require("../helpers/responses");
const { startGptConversation } = require("./chatGpt");
const { tool_get_products } = require("./products/productsDefs");
const { getProductsFn } = require("./products/productsFns");

const asyncCompose  = (...functions) => input => functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));
const toAI          = fn => asyncCompose( JSON.stringify, fn )


const availableFunctions = {
    get_products_fn: toAI(getProductsFn)
}


const sendMessagesToOpenAi = () => {

    const promesa = new Promise( (resolve, reject) => {

        Chat.find({}, async (err, data) => {
            
            if (err) return reject(err)

            const messages = _.sortBy(data, 'fecha')?.map( ({_id, fecha, ...rest}) => {
                return rest
            });

            const response = await startGptConversation({
                messages,
                tools: [ tool_get_products ],
                availableFunctions
            })

            resolve({ok: true, message: response})
        });

    });

    return promesa
};





const newChat = async (req, res) => {
    try {
        const { chat } = req.body

        Chat.insert({ fecha: new Date(), role: "user", content: chat })         //Inserta la pregunta del usuario
        const {ok, message} = await sendMessagesToOpenAi()                      //Llama una función que envía los mensajes a openAi y espera la respuesta

        if (ok) Chat.insert({ fecha: new Date(), ...message })

        Chat.find({}, responseCallback(res) )

    } catch (error) {
        catchError(res, error)
    }
}


const getChats = (req, res) => Chat.find({}, responseCallback(res) );

const delChats = async (req, res) => {
    try {
        Chat.remove({}, {multi: true})
        Chat.insert({fecha: new Date(), role: 'system', content: startPrompt })
        res.json({ok: true, msg: 'Chat Borrado', tipo: 'success'})
    } catch (error) {
        catchError(res, error)
    }
}




module.exports = {
    newChat,
    getChats,
    delChats
}