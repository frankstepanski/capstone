const express = require('express');
const messagesRouter = express.Router();

const { getAllMessages, createMessage, deactivateMessage } = require('../db/messages')

messagesRouter.use((req, res, next) => {
    console.log('> A request has been made to the /messages endpoint');
    next();
})

//get all messages route
messagesRouter.get('/', async function( req, res, next ){
    const messages = await getAllMessages()
        res.send({ messages })
        next()
});

messagesRouter.post('/', async function( req, res, next ){

    const { name, email, message } = req.body
    const messageData = {}
    messageData.name = name
    messageData.email = email
    messageData.message = message
    
    try {
        const newMessage = await createMessage(messageData)
        if(newMessage){
            res.send({ message:'Message created: ', message:messageData} )
        }
    } catch(error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })    
    }
});

messagesRouter.patch('/resolve', async ( req, res, next ) => {

    const { id: messageId } = req.body;
    
    try {
        const resolvedMessage = await deactivateMessage( {messageId} );

        console.log("<<<<<<<<< resolved message:",resolvedMessage)
        
        return res.send({status: "Success",
        message: "Product Updated!", post: resolvedMessage})
    
    } catch (error) {
        console.error("Failed to resolve message", error)
        next(error)
    }   
});


module.exports = messagesRouter;