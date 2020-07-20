const express = require('express');
const reviewsRouter = express.Router();

const { requireUser } = require('./utils')

const {
    userHasPurchased,
    createReview,
    getReviewById,
    updateReview,
    deleteReview
} = require ('../db')

reviewsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /reviews endpoint');
    next();
})

// check if user has purchased product
reviewsRouter.post('/check', requireUser, async (req, res, next) => {
    const {id: userId} = req.user;
    const {productId} = req.body;

    try {
        const hasPurchased = await userHasPurchased({userId, productId});
        res.send({hasPurchased})
    } catch(error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })    
    }
});

// Create new review
reviewsRouter.post('/create', requireUser, async ( req, res, next ) => {
    const {productId, title, rating, comment} = req.body;
    const { id: userId } = req.user;

    if (!rating || !title || !comment) {
        return res.send({status: "failed", message: "Title, rating, and comment are required fields"});
    }

    try {
        const hasPurchased = await userHasPurchased({userId, productId});

        if (!hasPurchased) {
            return res.send({status: "failed", message: "A product can only be reviewed by users who have purchased it"})
        } else if (rating > 5 || rating < 1) {
            return res.send({status: "failed", message: "Ratings must be a number between 1 and 5"});
        } else if (hasPurchased){
            const newReview = await createReview( {userId, productId, title, rating, comment});
            return res.send({status: "success", message: "Review Created!", review: newReview});
        }
    } catch (error) {
        console.error("Failed to create review", error)
        next(error)
    }   
});

//Update review contents
reviewsRouter.patch('/edit', requireUser, async ( req, res, next ) => {
    const {reviewId, title, rating, comment} = req.body;
    const { id: userId } = req.user;

    const filteredObj = {}
    Object.keys(req.body).forEach((key) => {
        if (req.body[key]) {
            filteredObj[key] = req.body[key];
        }
    })

    // delete these keys from the filteredObj to avoid users changing locked data
    delete filteredObj.reviewId;
    delete filteredObj.userId;
    delete filteredObj.id;

    try {
        const reviewToUpdate = await getReviewById(reviewId);

        if (!reviewToUpdate) {
            return res.send({
                status: "failed", 
                message: `Could not find review with id of ${reviewId}`
            })
        } else if (reviewToUpdate.userId !== userId) {
            return res.send({
                status: "failed", 
                message: "Users can only edit their own reviews"
            });
        } else if (reviewToUpdate){
            const updatedReview = await updateReview( {reviewId, fields: filteredObj});
            return res.send({
                status: "success", 
                message: "Review Updated!", 
                updatedReview
            });
        }
    } catch (error) {
        console.error("Failed to create review", error)
        next(error)
    }   
});

//Delete a review: 
reviewsRouter.delete('/delete', requireUser, async ( req, res, next ) => {
    const {reviewId} = req.body;
    const { id: userId } = req.user;

    try {
        const reviewToDelete = await getReviewById(reviewId);

        if (!reviewToDelete) {
            return res.send({
                status: "failed", 
                message: `Could not delete review with id of ${reviewId}`
            });
        } else if (reviewToDelete.userId !== userId) {
            return res.send({
                status: "failed", 
                message: "Users can only delete their own reviews"
            });
        } else if (reviewToDelete){
            const deletedReview = await deleteReview( {reviewId});
            return res.send({
                status: "success", 
                message: "Review deleted!", 
                deletedReview
            });
        };
    } catch (error) {
        console.error("Failed to create review", error)
        next(error)
    }   
});

module.exports = reviewsRouter;