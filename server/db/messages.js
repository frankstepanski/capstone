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
    message,
    resolved
}) => {

    try{
    const { rows: [ contact_message ] } = await client.query(
        `INSERT INTO messages (name, email, message, resolved)
        VALUES($1,$2,$3, $4)
        RETURNING *;
        `, [name,email,message, resolved]
    );
    console.log('>>>>>>>', contact_message)
        return message;
       
    } catch (error) {
    throw error;
  }
}

const deactivateMessage = async ({messageId}) => {
    try {
        const { rows } = await client.query(`
        UPDATE messages
        SET resolved = true
        WHERE id = $1
        RETURNING * ; 
        `, [messageId]);

        return rows
    }catch(error){
        console.error("Failed to deactivate message", error)
    }
}



module.exports = {
    getAllMessages,
    createMessage,
    deactivateMessage,
}