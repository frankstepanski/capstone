const { client } = require('./client');

const { getClosedCartsByUserID } = require('./carts');


const getReviewsByUserId = async ({userId}) => {
    try {
        const {rows: reviews} = await client.query(`
            SELECT * FROM reviews
            WHERE "userId"=$1;
        `, [userId]);

        return reviews;
    } catch (e) {
        throw e;
    }
}

//returns boolean if the user has purchased product
const userHasPurchased = async ({userId, productId}) => {
    try {
        const closedCarts = await getClosedCartsByUserID({userId});
        console.log(closedCarts);

        const productsPurchased = closedCarts.filter((cart) => {
            const products = cart.products.filter((product) => {
                const { productId: pid} = product;
                if (pid === productId) {
                    return product;
                }
            });
            console.log('products: ', products.length);
            return products.length;
        });

        return Boolean(productsPurchased.length);
    } catch (e) {
        throw e;
    }
}


// works
const createReview = async ({
    productId,
    userId,
    title,
    rating,
    comment
}) => {
    try{
        const { rows: [ review ]} = await client.query(`
        INSERT INTO reviews ("productId", "userId", title, rating, comment)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *;
        `, [productId,userId,title,rating,comment]);

        return review

    } catch(error){
        throw error;
    }
}

const deleteReview = async ({reviewId}) => {
    try{
        const { rows: removedItems } = await client.query(`
            DELETE FROM reviews
            WHERE id=$1
            RETURNING *;
        `, [reviewId]);

        return removedItems;
    }
    catch(error){
        console.error(`Error deleting review: ${ error }`)
        throw error;
    }
}

const updateReview = async ({reviewId, fields}) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return
    }
    
    try {
        const { rows: [ updatedReview ] }= await client.query(`
            UPDATE reviews
            SET ${ setString }
            WHERE id=${ reviewId }
            RETURNING *;
        `, Object.values(fields));
    
        return updatedReview;

      }
      catch(error){
        console.error(`>>>>>updateReview error. ${ error }`)
        throw error;
      }

}

const getReviewById = async (reviewId) => {
    try{
        const { rows: [review] } = await client.query(`
            SELECT * FROM reviews
            WHERE id=$1;
        `, [ reviewId ]);
        
        return review;
    }
    catch(error){
        console.error(`getREviewById error. ${ error }`)
        throw error;
    }

}

const getReviewsByProductId = async(productId) => {

    try {

        const { rows: [reviews] } = await client.query(`
            SELECT * FROM reviews
            WHERE "productId"=$1;
        `, [productId]);

        return reviews;

    }
    catch(error){
        console.error(`getReviewsByProductsId error. ${ error }`)
        throw error;
    }

}

module.exports = {
    createReview,
    userHasPurchased,
    deleteReview,
    updateReview,
    getReviewsByProductId,
    getReviewById,
    getReviewsByUserId,
}