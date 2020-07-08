const client = require("./client");

const addProductToCart = async (productId, cartId) => {

    try{

        const { rows: [ newCartProduct ] } = await client.query(`
            INSERT INTO cart_products
            ("productId", "cartId")
            VALUES ($1, $2)
            RETURNING *
        `, [productId, cartId])

        return newCartProduct;
    }
    catch(error){
        console.error(`addProdcutToCart error. ${ error }`)
        throw error;
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

const getProductsByCartId = async (cartId) => {

    try{
        
        const {rows: cartProducts } = await client.query(`
            SELECT * FROM cart_products
            WHERE "cartId"=($1);
        `, [cartId]);

        return cartProducts;
        
    }
    catch(error){
        console.error(`getProductsByCartId error. ${ error }`)
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
    getCartProductsByProductId
}