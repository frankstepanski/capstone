const { client } = require('./client');
const { getCartProductsByCartId } = require('./cart_products');
const { updateProductQuantity } = require('./products');

// carts where the Purchased value is true are completed orders
// There can only be 1 active cart per user at a time

//Get open and closed carts
const getCartsByUserID = async ({userId}) => {
    try {
        const { rows: [carts] } = await client.query(`
            SELECT * 
            FROM carts
            WHERE "userId"= $1;
        `, [userId])

        return carts;
    } catch (e) {
        console.error(`error getting cart by userId`, e);
        throw (e);
    }
}

// get only the user's open cart:
const getOpenCartByUserId = async ({userId}) => {
    try {
        const { rows: [openCart] } = await client.query(`
            SELECT * 
            FROM carts
            WHERE "userId"= $1
            AND purchased=FALSE;
        `, [userId]);

        const products = await getCartProductsByCartId({cartId: openCart.id})
        console.log(`products: `, products);
        openCart.products = products;
        return openCart;
    } catch (e) {
        console.error(`error getting open cart by userId`, e);
        throw (e);
    }
}

// Create cart:
const createCart = async ({userId}) => {
    try {
        const { rows: [emptyCart] } = await client.query(`
            INSERT INTO carts("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId])

        return emptyCart;
    } catch (e) {
        console.error(`Error creating cart`, e)
        throw e;
    }
}

// Close Cart (on checkout. Adds shippingAddress, orderDate, and sets 'purchased' = true)

const closeCart = async ({cartId, shippingAddress}) => {
    const now = new Date();
    const orderDate = now.toLocaleDateString("en-US");

    try {
        //Update and close cart
        const { rows: [closedCart] } = await client.query(`
            UPDATE carts
            SET "orderDate"=$1, "shippingAddress"=$2, purchsed=true
            WHERE id=$3
            RETURNING *;
        `, [orderDate, shippingAddress, cartId])

        //Update stock:
        const cartProducts = await getCartProductsByCartId({cartId});
        const prodPromises = cartProducts.map(async (item) => {
            const updatedProd = await updateProductQuantity({productId: item.productId, quantity: item.quantity});
            return updatedProd;
        });

        const updatedProds = await Promise.all(prodPromises);
        console.log(updatedProds);
        return closedCart;
    } catch (e) {
        console.error(`Error checking out`, e);
        throw e;
    }
}


module.exports = {
    getCartsByUserID,
    getOpenCartByUserId,
    createCart,
    closeCart
}