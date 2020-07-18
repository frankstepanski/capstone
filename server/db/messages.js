const { client } = require('./client');

async function getAllMessages() {
    const { rows } = await client.query(`
    SELECT *
    FROM messages;
    `);

    return rows;
}

const createMessage = async ({
    name,
    email, 
    phone,
    message,

}) => {

    try{
    const { rows: [ contact_message ] } = await client.query(
        `INSERT INTO messages (name, email, phone, message)
        VALUES($1,$2,$3,$4)
        RETURNING *;
        `, [name,email,phone,message]
    );
    console.log('>>>>>>>', contact_message)
        return message;
       
    } catch (error) {
    throw error;
  }
}

module.exports = {
    getAllMessages,
    createMessage
}