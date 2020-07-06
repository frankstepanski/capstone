const express = require('express');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
    console.log('> A request has been made to the /users endpoint');
    next();
})

module.exports = usersRouter;