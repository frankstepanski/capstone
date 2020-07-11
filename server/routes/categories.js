const express = require('express');
const categoriesRouter = express.Router();

const { createCategory, updateCategory, getCategoryById, getAllCategories} = require('../db/categories.js');

categoriesRouter.use((req, res, next) => {
    console.log('> A request has been made to the /categroies endpoint');
    next();
})

// get all categories route:
categoriesRouter.get('/', async function( req, res, next ){
    const categories = await getAllCategories()
    if(categories){
        res.send({ message:'Here are all of the categories', allCategories:categories  })
        next()
    }
})

// create category route
categoriesRouter.post('/newcategory', async function( req, res, next ){
    const { name } = req.body 
    const categoryData = {}
    categoryData.name = name
    try {
        const newCategory = await createCategory(categoryData)
        res.send({ message:'New Category Created', category: newCategory})
        
    } catch(error) {
        console.error(error)
        next()
    }
});

// update category route
categoriesRouter.patch('/update/:id', async function ( req, res, next ){
    const { id } = req.params
    const category = await getCategoryById(id)
    const { fields } = category
    try {
        if(category){
            const updatedCategory = await updateCategory(id, fields)
            res.send({ message:'Category updated.', category:updatedCategory})
        }
        
    } catch (error) {
        console.error(error)
        next()   
    }
});

// add category to product route
//categoriesRouter.patch('/:productId', async function( req, res, next){
    

//})


module.exports = categoriesRouter