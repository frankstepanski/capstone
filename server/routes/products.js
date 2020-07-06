const express = require('express');
const productsRouter = express.Router();

productsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /products endpoint');
    next();
})

module.exports = productsRouter;