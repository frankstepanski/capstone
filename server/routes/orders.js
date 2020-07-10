const express = require('express');
const ordersRouter = express.Router();

const { createOrder, getAllOrders } = require('../db/orders.js');

ordersRouter.use(function( req, res, next){
    console.log("A request has been made to the /orders endpoint.");
    next();
})

// get all orders route
ordersRouter.get('/', async function( req, res, next ){
    try{
        const orders = await getAllOrders()
        if(orders){
            res.send({ allOrders })
        }
    }catch(error){
    console.error(error)
    next()
    }
});

// Create order route
ordersRouter.post('/', requireUser, async function( req, res, next ){

    const { userId, products, orderDate, orderTotal, shippingAddress } = req.body
    const orderData = {}
    orderData.userId = userId
    orderData.products = products
    orderData.orderDate = orderDate
    orderData.orderTotal = orderTotal
    orderData.shippingAddress = shippingAddress

    try {
        const newOrder = await createOrder(orderData)
        if(newOrder){
            res.send({ message:'Order created: ', order:orderData} )
        }
    } catch(error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })    
    }
});

// add product to order route
//ordersRouter.patch('/:productId', async function ( req, res, next ){
   

//});


module.exports = ordersRouter