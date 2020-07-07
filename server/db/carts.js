const { client } = require('./client');

const createCart = async ({
    

}) => {
    try {
        //there can only be one cart per user. On checkout the cart is deleted (from DB or from localstorage if guest user). 
        const {rows: cart} = await client.query(`

        `)

        return cart;
    } catch(error){
        throw error;
    }
}

module.exports = {
    createCart
}