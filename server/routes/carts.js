const express = require('express');
const cartsRouter = express.Router();
const {requireUser} = require('./utils')

const { 
    getCartsByUserID, // comes from db/carts
    getOpenCartByUserId, // comes from db/carts
    createCart, // comes from db/carts
    closeCart, // comes from db/carts
    getGrandTotal, //comes from db/products
} = require('../db');

cartsRouter.use(function( req, res, next){
    console.log("A request has been made to the /carts endpoint.");
    next();
})

// get all carts for current user
cartsRouter.get('/', requireUser, async function( req, res, next ){
    const { id: userId} = req.user;

    try{
        const carts = await getCartsByUserID({userId})
        if(carts){
            res.send({ carts });
        } else {
            res.send({message: 'user has no carts'})
        }
    }catch(error){
    console.error(error)
    next()
    }
});

//Get open cart:
cartsRouter.get('/open', requireUser, async function( req, res, next ){
    const { id: userId} = req.user;

    try {
        const cart = await getOpenCartByUserId({userId})
        if(cart){
            res.send({ cart })
        } else {
            res.send({status: 'failed', message: 'User has no open carts, try opening a new one with the POST /create route'})
        }
    } catch(e){
    console.error(e)
    next(e)
    }
});

// Create new cart (will not have shippingAddress or orderDate)
// Should always occur if the user does not already have an open cart
cartsRouter.post('/create', requireUser, async function( req, res, next ){
    const { id: userId } = req.user;

    try {
        const newCart = await createCart({userId})
        if (newCart) {
            res.send({ message:'New cart created: ', cart: newCart} )
        }
    } catch(error) {
        console.error(error)
        next(error)    
    };
});

//CHECKOUT:
// actions:
// - Check if items are in stock? (Front-end job)              [ ]
// - Update shippingAddress (based of field data)              [x]
// - Calculate and return grand total (how?)                   [x]
// - Set Purchased to TRUE (Completed in DB method)            [x]
// - Update orderDate to current date (Completed in DB method) [x]
// - Update stock (Completed in DB Method)                     [x]

cartsRouter.patch('/checkout', requireUser, async (req, res, next) => {
    const { id: userId } = req.user;
    const { shippingAddress, cartId } = req.body
    try {
        const userCart = await getOpenCartByUserId({userId});

        if (userCart.userId === userId) {
            const {closedCart, newCart, newProductStock} = await closeCart({cartId, shippingAddress, userId});
            const total = await getGrandTotal({cartId})
            res.send({
                status: "success", 
                message: "Checkout successful", 
                order: closedCart,
                total,
                newCart,
                newProductStock
            });
        } else {
            console.log('Database is out of sync or user is hacking');
            res.send({
                status: 'failed', 
                message: `The cart with the id of '${cartId}' is not your cart.`
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
})


module.exports = cartsRouter