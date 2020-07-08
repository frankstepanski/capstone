const express = require('express');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
    console.log('> A request has been made to the /users endpoint');
    next();
})

usersRouter.get('/', async function  (req, res, next){
    try{
        const users = await getAllUsers();
        res.send({ users })
    }catch(error){
        console.error(error)
        const{ name, message } = error
        next({ name, message })
    }
  });

//Create New User Route
usersRouter.post('/register', async function (req, res, next){

});

//login User Route
usersRouter.post('/login', async function (req, res, next){
  
 
});

module.exports = usersRouter;