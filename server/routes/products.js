const express = require('express');
const productsRouter = express.Router();

const { getAllProducts, createProduct, getProductById, updateProduct } = require('../db/products.js')
const { requireUser } = require('../db/users.js')

productsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /products endpoint');
    next();
})

//get all products route
productsRouter.get('/', async function( req, res, next ){
    const products = await getAllProducts()
        res.send({ products })
        next()
});

//create product route
//productsRouter.post('/', requireUser, async function( req, res, next ){
    

//});

//edit product route
//productsRouter.patch('/:productId', requireUser, async function( req, res, next ){
   
//});


module.exports = productsRouter;