const express = require('express');
const cartProductsRouter = express.Router();
const { requireUser } = require('./utils');
const { 
    addProductToCart, // comes from db/cart_products
    updateCartProductQuantity, // comes from db/cart_products 
    removeProductFromCart, // comes from db/cart_products
    getProductById, // comes from db/products
} = require('../db');

cartProductsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /carts_products endpoint');
    next();
});

// add item to cart:
cartProductsRouter.post('/add', requireUser, async function (req, res, next){
    const { 
        productId, 
        cartId, 
        quantity 
    } = req.body;

    const { price: purchasePrice} = await getProductById(productId)
    
    try {
        const newCartItem = await addProductToCart({ productId, cartId, purchasePrice, quantity})
        res.send({ status: "success", message:'Item added to cart', newCartItem })
        
    } catch(error) {
        console.error(error)
        next();
    }
});

// update cart_product (quantity):
cartProductsRouter.patch('/:id', async function (req, res, next){
    const { id: cartProductId } = req.params
    const { quantity } = req.body
    
    try{
        const updatedCartProduct = await updateCartProductQuantity({cartProductId, quantity})
        if(updatedCartProduct){
            res.send({ 
                status: 'success', 
                message: 'Quantity updated', 
                item: updatedCartProduct
            })
        } else {
            res.send({status: 'failed', error: 'stockExceeded', message: 'There are not enough products to fulfill the request'})
        }
    }catch(error){
        console.error(error)
        next()
    }
});

// remove item from cart
cartProductsRouter.delete('/:id', async function ( req, res, next ){
    const { id: cartProductId } = req.params;

    try{
        const removedItem = await removeProductFromCart({cartProductId: id})
        if (removedItem){
            res.send({ status: 'success', message:'Item deleted.', removed: removedItem })
        } else {
            res.send({ 
                status: 'failed', 
                message: `could not remove item with cartProductId of ${cartProductId}`})
        }
    } catch(error){
        console.error(error)
        next(error)
    }
});

module.exports = cartProductsRouter;