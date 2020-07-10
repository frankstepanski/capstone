const { client } = require('./client');
const { addProductToCart, removeProductFromCart, getProductsByCartId } = require("./cart_products");

const createCart = async ({
    userId=NaN,
    products = '{}'
}) => {
    try {
       
        // user is logged in
        if(!userId === NaN){
       
            const { rows: [ cart ] } = await client.query(
                `INSERT INTO carts ("userId",products)
                VALUES($1,$2)
                RETURNING *;
                `, [userId,products]
            );

            // **** only if user is logged in ****
            // each product needs an entry into cart_products
            // step 1: have to find all products from object (put into array)
            // step 2: loop through all products and call addProductsToCart function(productID, cart.id)

            return cart;
        
        // guest visitor
        } else {

            const { rows: [ cart ] } = await client.query(
                `INSERT INTO carts ("userId",products)
                VALUES($1,$2)
                RETURNING *;
                `, [userId,products]
            );

            return cart;

        }

    } catch (error) {
            console.error(`>>>>>createCart error. ${ error }`)
            throw error;
    }
}

const updateCart = async (id, fields ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return
    }

    try {

        const { rows: [ cart ] }= await client.query(`
            UPDATE carts
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));

        return cart;

    }
    catch (error) {
        console.error(`>>>>>updateCart error. ${ error }`)
        throw error;
    }
}

const deleteCart = async (cartId) => {

    try{

        

            
      
    }
    catch(error){
        console.error(`>>>>>deleteCart error. ${ error }`)
        throw error;
    }
    
}

const getCartById = async (cartId) => {

    try {

        const { rows: [cart] } = await client.query(`
            SELECT * FROM carts
            WHERE id=$1;
        `, [cartId]);
        
        return cart;
    }
    catch (error){
        console.error(`>>>>>getCartById error. ${ error }`);
        throw error;
    }

}

const getCartByUserId = async (userId) => {

    try {

        const { rows: [ cart ] } = await client.query(`
        SELECT * FROM carts
        WHERE "userId"=$1;
        `, [userId]);

        return cart;
    }
    catch(error){
        console.error(`getCartByUserId error. ${ error }`)  
        throw error;
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getCartByUserId,
}