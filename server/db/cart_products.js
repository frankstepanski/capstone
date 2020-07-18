const { client } = require("./client");

const getCart = async ({userId}) => {
    try {
        const {rows: [cart]} = await client.query(`
            SELECT * 
            FROM cart_products
            WHERE "userId"=$1;
        `, [userId])
    } catch (e) {
        console.error(`getCart error. ${ e }`)
        throw e;
    }
}

const addProductToCart = async ({productId, userId, quantity}) => {

    try{

        const { rows: [ newCartProduct ] } = await client.query(`
            INSERT INTO cart_products
            ("productId", "userId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [productId, userId, quantity])

        return newCartProduct;
    }
    catch(error){
        console.error(`addProdcutToCart error. ${ error }`)
        throw error;
    }

}

const updateCartProductQuantity = async ({cartProductId, quantity}) => {
    try {
        const { rows: [ updatedItem ] } = await client.query(`
            UPDATE cart_products
            SET quantity = $1
            WHERE id = $2
            RETURNING *;
        `, [quantity, cartProductId])

        return updatedItem;
    } catch (e) {
        console.error(`updateCartProductQuantity error: ${e}`)
        throw e;
    }
}

const removeProductFromCart = async (cartProductId) => {

    try{

        const cartProduct = await getCartProductById(cartProductId);

        if(cartProduct){
            const { rows: [ deletedCartProduct ] } = await client.query(`
                DELETE FROM cart_products
                WHERE id=$1
                RETURNING *;
            `, [cartProductId]);

            return deletedCartProduct;
        }
        else{
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

const getCartProductById = async (cartProductId) => {
    
    try{
        
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

const getCartProductsByProductId = async(productId) => {

    try{
        
        const { rows: productsArr } = await client.query(`
            SELECT * FROM cart_products
            WHERE "productId"=$1;
        `, [productId])

        return productsArr;

    }
    catch(error){
        console.error(`getcartProductsByProductID error. ${ error }`)
        throw error;
    }

}

module.exports = {
    addProductToCart,
    removeProductFromCart,
    getCartProductById,
    getProductsByCartId,
    getCartProductsByProductId,
    updateCartProductQuantity,
    getCart
}