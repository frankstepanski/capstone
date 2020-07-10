const { client } = require('./client');

const createOrder = async ({

}) => {
    try {
       
       // under construction
       
    } catch(error){
        throw error;
    }
}

const getAllOrders = async () => {
    try{
        const { rows } = await client.query(
            `SELECT * FROM orders;
        `);

        return rows;

    }catch(error){
        throw error;
    }
}

const getOrderById = async (orderId) => {
    try{
        const { rows: [ order ] } = await client.query(
            `SELECT * FROM orders 
            WHERE id=${orderId}`
        );

        return order;
    }catch(error){
        throw error;
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById
}