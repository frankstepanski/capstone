const { client } = require('./client');

async function getAllPosts() {
    const { rows } = await client.query(`
    SELECT *
    FROM posts;
    `);

    return rows;
}

const createPost = async ({
    title,
    blogText

}) => {
    
    try{
    const { rows: [ post ] } = await client.query(
        `INSERT INTO posts (title, "blogText")
        VALUES($1,$2)
        RETURNING *;
        `, [title,blogText]
    );
    console.log('>>>>>>>', post)
        return post;
       
    } catch (error) {
    throw error;
  }
}

module.exports = {
    getAllPosts,
    createPost
}