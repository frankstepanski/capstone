const { client } = require('./client');

const { POINT_CONVERSION_UNCOMPRESSED } = require('constants');

const createProduct = async ({
    name,
    description,
    price,
    stock,
    featured,
    thumbnail,
    image,
    categoryId

}) => {
    
    try{
    const { rows: [ product ] } = await client.query(
        `INSERT INTO products (name, description, price, stock,featured,thumbnail, image, "categoryId")
        VALUES($1,$2,$3,$4,$5, $6, $7, $8)
        RETURNING *;
        `, [name,description,price,stock,featured,thumbnail, image, categoryId]
    );
    
        return product;
       
    } catch (error) {
    throw error;
  }
}



const updateProduct = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [ product ] }= await client.query(`
          UPDATE products
          SET ${ setString }
          WHERE id= $1
          RETURNING *;
        `, Object.values(fields));
    
        return product;
      } catch (error) {
        throw error;
      }
}

const getAllProducts = async () => {
    try {
        const { rows } = await client.query(`
            SELECT
            p.*,
            CASE WHEN count(r) = 0 THEN ARRAY[]::json[] ELSE array_agg(r.review) END AS reviews
            FROM products p
            LEFT OUTER JOIN (
                SELECT r1."productId", json_build_object('id', r1.id, 'userId', r1."userId", 'title', r1.title,'rating', r1.rating) AS review
                FROM reviews AS r1
            ) r 
                ON p.id = r."productId"
            GROUP BY p.id;
        `);
        
        return rows;

   } catch(error){
       throw error;
   }
}

const getProductById = async(productId) => {
    try { 
        const { rows: [product] } = await client.query(`
            SELECT
            p.*,
            CASE WHEN count(r) = 0 THEN ARRAY[]::json[] ELSE array_agg(r.review) END AS reviews
            FROM products p
            LEFT OUTER JOIN (
                SELECT r1."productId", json_build_object('id', r1.id, 'userId', r1."userId", 'title', r1.title,'rating', r1.rating) AS review
                FROM reviews AS r1
            ) r 
                ON p.id = r."productId"
            WHERE p.id = $1
            GROUP BY p.id;
        `, [productId]);

        if (!product) {
            throw { 
                name: "ProductNotFoundError",
                message: "Cannot find product with that productId"
            };
        }

        return product;
    } catch(error){
        throw error;
    }
}

const getProductByName = async({ name }) => {
    try{ 
        const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE name=$1
        `,[name]);



     return product;
    } catch(error){
        throw error;
    }
}

const getFeaturedProducts = async({featured}) => {
    try{
        const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE featured = TRUE
        ORDER BY RANDOM()
        LIMIT 3
        `, [featured]);
        
        return product;
    } catch(error){
        throw error;
    }
}

const getProductStock = async ({productId}) => {
    try {
        const {rows: [productStock]} = await client.query(`
            SELECT stock
            FROM products
            WHERE id=$1;
        `, [productId]);
        
        return productStock.stock;
    } catch (e) {
        throw (e)
    }
}

const updateProductQuantity = async ({productId, quantity}) => {
    try {
        const currStock = await getProductStock({productId});
        const newStock = currStock - quantity
        const {rows: [updatedProduct]} = await client.query(`
            UPDATE products
            SET stock=$1
            WHERE id=$2
            RETURNING *;
        `, [newStock, productId]);

        return updatedProduct;
    } catch (e) {
        throw (e)
    }
}


// products will only be deactivated (not deleted)
const deactivateProduct = async (product) => {
    try {

        const { rows } = await client.query(`
        UPDATE products
        SET active = NOT active 
        WHERE id = $1
        RETURNING * ;
        `, [product]);
        
       return rows
     }catch(error){
         console.error("Failed to deactivate product", error)
     }
}

const activateFeaturedProduct = async (product) => {
    try {

        const { rows } = await client.query(`
        UPDATE products
        SET featured = NOT featured 
        WHERE id = $1
        RETURNING * ;
        `, [product]);
        
       return rows
     }catch(error){
         console.error("Failed to activate featured product", error)
     }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    updateProduct,
    deactivateProduct,
    activateFeaturedProduct,
    getFeaturedProducts,
    updateProductQuantity,
    getProductStock,
}