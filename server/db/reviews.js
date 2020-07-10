const { client } = require('./client');

// const { addReviewToProduct, removeReviewFromProduct, getProductReviewByReviewId } = require("./product_reviews");

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

const deleteReview = async (reviewId) => {
    
    try{

       
    }
    catch(error){
        console.error(`>>>>>deleteReviews error. ${ error }`)
        throw error;
    }
}

const updateReview = async (reviewId, fields = {}) => {

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
        
        return reviewId;

    }
    catch(error){
        console.error(`getREviewById error. ${ error }`)
        throw error;
    }

}

const getReviewsByProductId = async(productId) => {

    try {

        const { rows: [reviews] } = await client.query(
            `SELECT * FROM reviews
            WHERE "productId"=$1`
        , [productId]);

        return reviews;

    }
    catch(error){
        console.error(`getReviewsByProductsId error. ${ error }`)
        throw error;
    }

}

const getReviewsByUserId = async(userId) => {

    try {
        const { rows: reviews } = await client.query(
            `SELECT * FROM reviews
            WHERE "userId"=$1`
        , [userId]);

        return reviews;

    }
    catch(error){
        console.error(`getReviewsByUserId error. ${ error }`)
        throw error;
    }

}

module.exports = {
    createReview,
    deleteReview,
    updateReview,
    getReviewsByProductId,
    getReviewsByUserId,
    getReviewById
}