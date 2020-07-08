const express = require('express');
const cartsRouter = express.Router();

const { createCart, updateCart, deleteCart, getCartById } = require('../db/carts.js')

// add poduct to cart route
const { getProductById } = require('../db/products.js')

cartsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /carts endpoint');
    next();
})

// new cart route:
cartsRouter.post('/', requireUser, async function (req, res, next){
    const { userId, products } = req.body
    const cartData = {}

    cartData.userId = userId 
    cartData.products = products 
    
    try {
        const newCart = await createCart(cartData)
        res.send({ message:'Cart items are: ', cart: newCart })
        
    } catch(error) {
        console.error(error)
        next()       
    }
});

// update cart route:
cartsRouter.patch('/:id', async function (req, res, next){
    const { id } = req.params
    const cart = await getCartById(id)
    const { fields } = cart

    const cartData = {}
    cartData.id = id
    cartData.fields = fields
    
    try{
        const updatedCart = await updateCart( cartData.id, cartData.fields )
        if(updatedCart){
            res.send({ message:'Updated cart: ', cart:updatedCart })
            }
    }catch(error){
        console.error(error)
        next()
    }
});

// delete cart route
cartsRouter.delete('/:id', async function ( req, res, next ){
    const { id } = req.params
    const cart = await getCartById(id)

    try{
        const deletedCart = await deleteCart(cart)
        if(deletedCart){
            res.send({ message:'Cart deleted.', cart:deletedCart })
        }
    } catch(error){
        console.error(error)
        next()
    }
});

// add poduct to cart route:
cartsRouter.put('/:productId', async function ( req, res, next ){
   

});

// delete product from cart route
cartsRouter.delete('/:productId', async function ( req, res, next){
    

});

module.exports = cartsRouter;