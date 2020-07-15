const express = require('express');
const productsRouter = express.Router();

const { getAllProducts, createProduct, getProductById, updateProduct, getProductByName , deactivateProduct} = require('../db/products.js')
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

// create product route
productsRouter.post('/create', requireUser, async ( req, res, next ) => {
        const {
            name,
            description,
            price,
            stock,
            categoryId,
        } = req.body;

        console.log('Product Post:' )

        if (!name || !description || !price || !stock || !categoryId) {
            next ({
                name: 'Missing Item Name',
                description: 'Missing Item Description',
                price: 'Missing Item Price',
                stock: 'Missing if Item is in Stock',
                categoryId: 'Missing the Category Id Number'
            })
        }

        try {
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
                    categoryId, 
                }) 

                // return newItem
                // next(newItem)
                
                return res.send ({ 
                    status: "Success!",
                    message: "Item was created!"

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
        
        return res.send({status: "Success",
        message: "Product Updated!", product: updatedProduct})
    
    } catch (error) {
        console.error("Failed to update product", error)
        next(error)
    }   
});

productsRouter.patch('/deactivate',  async ( req, res, next ) => {
        const { 
            id,
            active 
        } = req.body;

        const user = req.user
    
    const filteredObj = {}
    Object.keys(req.body).forEach((key) => {
            if (req.body[key]) {
                filteredObj[key] = req.body[key];
            }
    })
    
    try {
        const updatedActiveProduct = await deactivateProduct(id, active,fields =  filteredObj);
        console.log("updated activate obj:",updatedActiveProduct)
        
        return res.send({status: "Success",
        message: "Active Product Updated!", product: updatedActiveProduct})
    
    } catch (error) {
        console.error("Failed to update Active Product", error)
        next(error)
    }   

})

module.exports = productsRouter;