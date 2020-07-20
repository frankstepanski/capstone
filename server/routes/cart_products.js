const express = require('express');
const cartProductsRouter = express.Router();
const { requireUser } = require('./utils');
const { 
    addProductToCart, // comes from db/cart_products
    updateCartProductQuantity, // comes from db/cart_products 
    removeProductFromCart, // comes from db/cart_products
    getProductById, // comes from db/products
    clearCart, // from db/cart_products
    getOpenCartByUserId // from db/carts
} = require('../db');

cartProductsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /carts_products endpoint');
    next();
});

// add item to cart:
cartProductsRouter.post('/add', requireUser, async function (req, res, next){
    const { 
        productId, 
        quantity 
    } = req.body;
    const {id: userId} = req.user;
    try {
        // get cartId:
        const {id: cartId} = await getOpenCartByUserId({userId});
        // get current purchase price:
        const { price: purchasePrice} = await getProductById(productId);
        // add item:
        const newCartItem = await addProductToCart({ productId, cartId, purchasePrice, quantity});
        // get updated cart object:
        const updatedCart = await getOpenCartByUserId({userId});
        res.send({ status: "success", message:'Item added to cart', updatedCart });        
    } catch(error) {
        console.error(error)
        next();
    }
});

// update cart_product (quantity):
cartProductsRouter.patch('/:cartProductId', async function (req, res, next){
    const { cartProductId } = req.params
    const { quantity } = req.body
    const { id: userId } = req.user
    
    try{
        const updatedCartProduct = await updateCartProductQuantity({cartProductId, quantity})
        if(updatedCartProduct){
            const updatedCart = await getOpenCartByUserId({userId});

            res.send({ 
                status: 'success', 
                message: 'Quantity updated', 
                updatedCart
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
cartProductsRouter.delete('/:cartProductId', requireUser, async function ( req, res, next ){
    const { cartProductId } = req.params;

    try {
        const removedItem = await removeProductFromCart({cartProductId})
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

//clear cart:
cartProductsRouter.delete('/clear', requireUser, async function ( req, res, next ){
    const { id: userId } = req.user;

    try{
        //Get cartId:
        const { id: cartId} = await getOpenCartByUserId({userId});
        //Remove all items from cart:
        const removedItems = await clearCart({cartId})
        //Get updated/ emptyCart:
        const emptyCart = await getOpenCartByUserId({userId});
        if (removedItems){
            res.send({ status: 'success', message:'Cart cleared.', emptyCart })
        } else {
            res.send({ 
                status: 'failed', 
                message: `cart was already empty`})
        }
    } catch(error){
        console.error(error)
        next(error)
    }
});

module.exports = cartProductsRouter;