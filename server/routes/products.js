const express = require('express');
const productsRouter = express.Router();

const { getAllProducts, 
    createProduct, 
    getProductById, 
    updateProduct, 
    getProductByName , 
    deactivateProduct, 
    activateFeaturedProduct, 
    getFeaturedProducts, 
    getProductStock
} = require('../db/products.js')

const { requireUser } = require('./utils')

productsRouter.use((req, res, next) => {
    console.log('> A request has been made to the /products endpoint');
    next();
})

//get all products route
productsRouter.get('/', async ( req, res, next ) => {
    const products = await getAllProducts()
        res.send({ products })
        next()
});

// get featured products route
productsRouter.get('/featured', async (req, res, next) => {
    const featuredProducts = await getFeaturedProducts()
        res.send({ featuredProducts })
        next()
})

// create product route
productsRouter.post('/create', requireUser, async ( req, res, next ) => {
        const {
            name,
            description,
            price,
            stock,
            active,
            featured,
            thumbnail,
            image,
            categoryId,
        } = req.body;

        console.log('Product Post:' )

        try {
            const requiredParams = {            
                name,
                description,
                price,
                stock,
                thumbnail,
                image,
                categoryId
            };
            for (const [key, value] of Object.entries(requiredParams)) {
                if (!value) {
                    throw new Error(`Missing data at position '${key}'`)
                }
            }

            const productItems = await getProductByName({ name });

            if (productItems) {
                
                console.log('Item already exist')

                return;
            } else { 
                const newItem = await createProduct({
                    name,
                    description,
                    price,
                    stock,
                    thumbnail,
                    image,
                    featured,
                    categoryId, 
                }) 

                // return newItem
                // next(newItem)
                
                return res.send ({ 
                    success: true,
                    message: "Item was created!",
                    product: newItem
                }); 
             } }catch (error){
                 console.error('Error creating item!', error)
                 next(error)

                }
        });


//edit product route
productsRouter.patch('/edit', requireUser, async ( req, res, next ) => {

    const {
        id,
        name,
        description,
        price,
        stock,
        active,
        featured,
        categoryId
    } = req.body;
    const user = req.user
    
    const filteredObj = {}
    Object.keys(req.body).forEach((key) => {
            if (req.body[key]) {
                filteredObj[key] = req.body[key];
            }
    })


    try {
        const updatedProduct = await updateProduct(id, fields =  filteredObj);

        console.log("<<<<<<<<< updated obj:",updatedProduct)
        
        return res.send({success: true,
        message: "Product Updated!", product: updatedProduct})
    
    } catch (error) {
        console.error("Failed to update product", error)
        next(error)
    }   
});

//route to get existing stock of a product based off productId:
productsRouter.post('/stock', async (req, res, next) => {
    const { productId } = req.body
    try {
        const stock = await getProductStock({productId});
        res.send({success: true, stock})
    } catch (e) {
        console.error("Failed to get product stock", e)
        next(e)
    }
})

module.exports = productsRouter;