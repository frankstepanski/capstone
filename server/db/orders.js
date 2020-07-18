const { client } = require('./client');

// get require user from utils

const createOrder = async ({
        userId,
        products,
        orderDate,
        orderTotal,
        shippingAddress
}) => {
    try {
       const { rows: [ order ] } = await client.query(
        `INSERT INTO orders ("userId", products, "orderDate", "orderTotal", "shippingAddress")
        VALUES($1,$2,$3,$4,$5)
        RETURNING * ;
        `, [userId,products,orderDate,orderTotal,shippingAddress]
       );
       
       return order;
       
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