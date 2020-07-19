const { client } = require("./client");
const { getProductStock } = require('./products');

const getCartProductsByCartId = async ({cartId}) => {
    try {
        const { rows: [cartProducts] } = await client.query(`
            SELECT * 
            FROM cart_products
            WHERE "cartId" = $1;
        `, [cartId])

        return cartProducts;
    } catch (e) {
        console.error(`Unable to get cartProductsByCartId: ${ e }`)
        throw e;
    }
}


const addProductToCart = async ({productId, cartId, purchasePrice, quantity}) => {

    try{
        const { rows: [ newCartProduct ] } = await client.query(`
            INSERT INTO cart_products
            ("cartId", "productId", "purchasePrice", quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [cartId, productId, purchasePrice, quantity])

        return newCartProduct;
    }
    catch(error){
        console.error(`addProdcutToCart error. ${ error }`)
        throw error;
    }

}

const updateCartProductQuantity = async ({cartProductId, quantity}) => {
    try {
        //Get amount currently in stock
        const { productId } = await getCartProductById(cartProductId)
        const productStock = await getProductStock({productId})

        console.log(`
            productId: ${productId}, 
            productStock: ${productId}
        `)

        //if item has enough stock, update cartProduct, if not, return null
        if (quantity <= productStock) {
            const { rows: [ updatedItem ] } = await client.query(`
                UPDATE cart_products
                SET quantity = $1
                WHERE id = $2
                RETURNING *;
            `, [quantity, cartProductId]);

            return updatedItem;
        } else if (quantity > productStock){
            console.log(`Exceeds product stock`)
            return {code: `stockExceeded`};
        } else {
            throw new Error('Unknown error updating product stock');
        }
    } catch (e) {
        console.error(`updateCartProductQuantity error: ${e}`)
        throw e;
    }
}

const removeProductFromCart = async ({cartProductId}) => {

    try{

        const cartProduct = await getCartProductById(cartProductId);

        if(cartProduct){
            const { rows: [ deletedCartProduct ] } = await client.query(`
                DELETE FROM cart_products
                WHERE id=$1
                RETURNING *;
            `, [cartProductId]);

            return deletedCartProduct;
        } else{
            throw({
                name: "CartProductNotFoundError",
                message: "Cannot find Product with that ProductId in Cart"
            })
        }
    }
    catch(error){
        console.error(`removeProductFromCart error. ${ error }`)
        throw error;
    }
}

// only used in removeProductFromCart function at this time. Not exporting.
const getCartProductById = async (cartProductId) => {
    
    try {
        
        const { rows: [ cartProduct ] } = await client.query(`
            SELECT * FROM cart_products
            WHERE id=$1;
        `, [cartProductId]);

        return cartProduct;
    }
    catch(error){
        console.error(`getCartproductById error. ${ error }`)
        throw error;
    }
}

const getGrandTotal = async ({cartId}) => {
    try {
        const { rows: [items]} = await client.query(`
            SELECT *
            FROM cart_products
            WHERE "cartId" = $1;
        `, [cartId])

        const grandTotal = Object.values(items).reduce((a, b) => a + b, 0);

        return grandTotal;
    } catch (e) {
        console.error(`Could not calculate grand total`, e);
        throw e;
    }
}

module.exports = {
    getCartProductsByCartId,
    addProductToCart,
    updateCartProductQuantity,
    removeProductFromCart,
    getGrandTotal
}