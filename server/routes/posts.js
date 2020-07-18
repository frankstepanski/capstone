const express = require('express');
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /posts endpoint');
    next();
})

//get all posts route
postRouter.get('/', async function( req, res, next ){
    const messages = await getAllMessages()
        res.send({ messages })
        next()
});

// create a blog post route
postRouter.post('/', async function( req, res, next ){

    const { title, blogText } = req.body
    const postData = {}
    postData.title = title;
    postData.blogText = blogText;

    
    try {
        const newBlogPost = await createBlogPost(postData)
        if(newBlogPost){
            res.send({ message:'Blog post created: ', blog:newBlogPost} )
        }
    } catch(error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })    
    }
});


module.exports = postsRouter;