const { client } = require('./client');
const { getCartProductsByCartId } = require('./cart_products');
const { updateProductQuantity } = require('./products');

// carts where the Purchased value is true are completed orders
// There can only be 1 active cart per user at a time

//Get open and closed carts
const getCartsByUserID = async ({userId}) => {
    try {
        // This nasty query does something cool: It uses a subquery to create a table containing cartProducts and JOINs that table to the carts table to create a nested Products array of JSON objects
        const { rows: carts } = await client.query(`
            SELECT 
            c.*,
            CASE WHEN count(cp) = 0 THEN ARRAY[]::json[] ELSE array_agg(cp.product) END AS products
            FROM carts c
            LEFT OUTER JOIN (
                SELECT cp1."cartId", json_build_object('id', cp1.id, 'productId', cp1."productId", 'purchasePrice', cp1."purchasePrice",'quantity', cp1.quantity) AS product
                FROM cart_products AS cp1
            ) cp 
                ON c.id = cp."cartId"
            WHERE c."userId"= $1
            GROUP BY c.id;
        `, [userId]);

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
            SELECT 
            c.*,
            CASE WHEN count(cp) = 0 THEN ARRAY[]::json[] ELSE array_agg(cp.product) END AS products
            FROM carts c
            LEFT OUTER JOIN (
                SELECT cp1."cartId", json_build_object('id', cp1.id, 'productId', cp1."productId", 'purchasePrice', cp1."purchasePrice",'quantity', cp1.quantity) AS product
                FROM cart_products AS cp1
            ) cp 
                ON c.id = cp."cartId" 
            WHERE "userId"= $1
            AND purchased=FALSE
            GROUP BY c.id;
        `, [userId]);

        if (!openCart) {
            console.log(`User has no open carts, create a new one.`)
            return null;
        };

        return openCart;
    } catch (e) {
        console.error(`error getting open cart by userId`, e);
        throw (e);
    }
}

// Create cart:
const createCart = async ({userId}) => {
    try {
        const openCart = await getOpenCartByUserId({userId})

        if (!openCart) {
            const { rows: [emptyCart] } = await client.query(`
                INSERT INTO carts("userId")
                VALUES ($1)
                RETURNING *;
            `, [userId])

            return emptyCart;
        } else {
            console.log(`User already has an open cart`);
            return openCart;
        }
    } catch (e) {
        console.error(`Error creating cart`, e)
        throw e;
    }
}

// Close Cart (on checkout. Adds shippingAddress, orderDate, and sets 'purchased' = true)

const closeCart = async ({cartId, shippingAddress, userId}) => {

    try {
        // if the cart is still empty then the user should not be able to checkout
        const { products } = await getOpenCartByUserId({userId});
        if (!products) return null;

        //Update and close cart
        const { rows: [closedCart] } = await client.query(`
            UPDATE carts
            SET "orderDate"=(SELECT CURRENT_DATE), 
            "shippingAddress"=$1, 
            purchased=true
            WHERE id=$2
            RETURNING *;
        `, [ shippingAddress, cartId])

        //Update stock:
        const cartProducts = await getCartProductsByCartId({cartId});
        console.log(`> CART PRODUCTS: `, cartProducts)
        const prodPromises = cartProducts.map(async (item) => {
            const updatedProd = await updateProductQuantity({productId: item.productId, quantity: item.quantity});
            return updatedProd;
        });

        const updatedProds = await Promise.all(prodPromises);
        console.log("updatedProds: ", updatedProds);

        //Open new cart
        const newCart = await createCart({userId});
        return {closedCart, newCart, newProductStock: updatedProds};
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