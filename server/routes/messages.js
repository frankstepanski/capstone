const express = require('express');
const messagesRouter = express.Router();

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

    const { name, email, phone, message } = req.body
    const messageData = {}
    messageData.name = name
    messageData.email = email
    messageData.phone = phone
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


module.exports = messagesRouter;