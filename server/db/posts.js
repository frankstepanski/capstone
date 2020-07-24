const { client } = require('./client');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

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

const editPost = async ({title, blogText, postId}) =>{

    try{
        const { rows: [ post ] } = await client.query(
            `UPDATE posts 
            SET title = $1,
            "blogText" = $2
            WHERE id= $3
            RETURNING *;
            `, [title,blogText,postId]
        );
        console.log('>>>>>>>', post)
            return post;
           
        } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPosts,
    createPost,
    editPost
}