const { client } = require('./client');

async function getAllPosts() {
    const { rows } = await db.query(`
    SELECT *
    FROM posts;
    `);

    return rows;
}

module.exports = {
    getAllBlogs
}