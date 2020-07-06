const { client } = require('./client');

// create new user (public and admin) screen
const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    addresses = [],
    admin = false,
    active
}) => {
  
    try {
        const { rows: [ users ] } = await client.query(
            `INSERT INTO users(username, password, "firstName", "lastName", email, addresses, admin, active)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username,password,firstName,lastName,email,addresses,admin,active]
        );

        return users;

    } catch(error){
        throw error; 
    }
}

const getAllUsers = async () => {

    try {
        const { rows } = await client.query(`
           SELECT *
           FROM users;
        `);
    
        return rows;
    
      } catch (error){
        throw error;
      }
 }

 const getUserById = async (userId) => {
   
    try {
        const { rows: [ user ] } = await client.query(`
        SElECT * 
        FROM users
        WHERE id= $1
        `, [userId]);
        
        if(!user) {
            throw { 
                name: "UserNotFoundError",
                message: "Cannot find user with that userId"
            };   
        }

        return user

    } catch(error){
        throw error;
    }
}

const updateUser = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [ users ] }= await client.query(`
          UPDATE users
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return users;
      } catch (error) {
        throw error;
      }
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser
}