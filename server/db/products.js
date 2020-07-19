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
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return product;
      } catch (error) {
        throw error;
      }
}

const getAllProducts = async () => {

   try{
    const { rows } = await client.query(`
    SELECT * FROM products;
    `);
    
    return rows;

   } catch(error){
       throw error;
   }
    
}

const getProductById = async(productId) => {
    try{ 
        const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE id=${ productId }
        `);

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
        `, [productId])
        console.log(`rows: `, productStock.stock)
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
            RETURNING *;
        `, [newStock]);

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
         console.error("Failed to deactivate product", error)
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