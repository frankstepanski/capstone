const express = require('express');
const postsRouter = express.Router();

const { requireUser } = require('./utils')

const {
    getAllPosts, createPost, editPost,
} = require ('../db/posts')

postsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /posts endpoint');
    next();
})

//get all posts route
postsRouter.get('/', async function( req, res, next ){
    const messages = await getAllPosts()
        res.send({ messages })
        next()
});

// create a blog post route
postsRouter.post('/', async function( req, res, next ){

    const { title, blogText } = req.body
    const postData = {}
    postData.title = title;
    postData.blogText = blogText;

    
    try {
        const newBlogPost = await createPost(postData)
        if(newBlogPost){
            res.send({ message:'Blog post created: ', blog:newBlogPost} )
        }
    } catch(error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })    
    }
});

postsRouter.patch('/edit', async ( req, res, next ) => {

    const { title, blogText, id:postId } = req.body;
    
    try {
        const updatedPost = await editPost( {title, blogText, postId} );

        console.log("<<<<<<<<< updated obj:",updatedPost)
        
        return res.send({status: "Success",
        message: "Product Updated!", post: updatedPost})
    
    } catch (error) {
        console.error("Failed to update post", error)
        next(error)
    }   
});



module.exports = postsRouter;