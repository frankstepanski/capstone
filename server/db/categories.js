const { client } = require('./client');

// create category in admin screen:
const createCategory = async ({
    name
}) => {
    try {
        const { rows: [ category ] } = await client.query(
            `INSERT INTO categories (name)
             VALUES($1)
             RETURNING *;
            `,[name]
        );

        return category;

    } catch(error){
        throw error;
    }
}

const updateCategory = async (id, fields ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
        
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [ category ] }= await client.query(`
          UPDATE categories
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return category;
      } catch (error) {
        console.error(`updateCategory error. ${ error }`)
        throw error;
      }
}

const deleteCategory = async (categoryId) => {

    try {
        const { rows: [ deletedCategory ]} = await client.query(`
            DELETE FROM categories
            WHERE id=$1
            RETURNING *
        `, [categoryId]);

        return deletedCategory;
    }
    catch(error){
        console.error(`deleteCategory error. ${ error }`)
        throw error;
    }
}

const getAllCategories = async () => {
    try{
        const { rows } = await client.query(`
            SELECT * FROM categories;
        `);

        return rows;
    }catch(error){
        console.error(`getAllCategories error. ${ error }`)
        throw error;
    }
}

const getCategoryById = async (categoryId) => {

    try {
        const { rows: [ category ] } = await client.query(`
            SELECT * FROM categories
            WHERE id=$1
        `, [categoryId]);

        return category;

    } catch(error){
        console.error(`getCategoryById error. ${ error }`)
        throw error;
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById
}