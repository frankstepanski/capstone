const express = require('express');
const cartsRouter = express.Router();

const { addProductToCart, updateCartProductQuantity, getCart, removeProductFromCart, getCartProductById } = require('../db');

const { requireUser } = require('./utils');

// add poduct to cart route
const { getProductById } = require('../db');

cartsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /carts endpoint');
    next();
});

//get cart (by userId)
cartsRouter.get('/', requireUser, async (req,res, next) => {
    const { id: userId} = req.user;

    try {
        // in the future; grab a users active (not purchased) cart
        // or create one, if they do not have an active cart
        const cart = await getCart({userId});

    } catch (e) {
        console.error(e);
    }
});
// add item to cart:
cartsRouter.post('/', requireUser, async function (req, res, next){
    const { product: { id: productId }, quantity } = req.body;
    const { id: userId } = req.user;

    try {
        // check the available quantity of a product first

        // get the active cart for a user; or create on the fly
        // have a db function that will create cart product; (cartId, productId, quantity, pricePurchasedAt)
        const newCartItem = await addProductToCart({userId, productId, quantity});
        res.send({ message:'Cart item is: ', newCartItem });

    } catch(error) {
        console.error(error);
        next();
    }
});

// update cart_product (quantity):
cartsRouter.patch('/:id', async function (req, res, next){
    const { id: cartProductId } = req.params;
    const { quantity } = req.body;

    try{
        // make sure stock is available if increasing purchase quantity
        // if decreasing purchase quantity; add stock back to product

        const updatedCartProduct = await updateCartProductQuantity({cartProductId, quantity});

        // add an else so the request doesn't hang
        if(updatedCartProduct){
            res.send({ message:'Updated cart: ',  });
            }
    }catch(error){
        console.error(error);
        next();
    }
});

// delete cart route
cartsRouter.delete('/:id', async function ( req, res, next ){
    const { id } = req.params;
    const cart = await getCartById(id);

    try{
        const deletedCart = await deleteCart(cart);
        if(deletedCart){
            res.send({ message:'Cart deleted.', cart:deletedCart });
        }
    } catch(error){
        console.error(error);
        next();
    }
});

// add poduct to cart route:
//cartsRouter.put('/:productId', async function ( req, res, next ){


//});

// delete product from cart route
//cartsRouter.delete('/:productId', async function ( req, res, next){


//});

module.exports = cartsRouter;
