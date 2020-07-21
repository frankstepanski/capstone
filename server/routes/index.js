const express = require('express');
const apiRouter = express.Router();

const morgan = require('morgan');
apiRouter.use(morgan('dev'));

const bodyParser = require('body-parser')
apiRouter.use(bodyParser.json());


// Function to verify tokens when a request is made to the API:
const { getUserById } = require('../db');
const jwt = require('jsonwebtoken')
const { SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const {id} = jwt.verify(token, SECRET);

            if (id) {
                req.user = await getUserById(id);
                console.log(`req.user: `, req.user)
                next();
            }
        } catch ({name, message}) {
            next({name, message});
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    };
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const cartsRouter = require('./carts');
apiRouter.use('/carts', cartsRouter);

const cartProductsRouter = require('./cart_products');
apiRouter.use('/cart_products', cartProductsRouter);

const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const messagesRouter = require('./messages');
apiRouter.use('/messages', messagesRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

apiRouter.use((error, req, res, next) => {
    console.log("this is the real error", error.message);
    res.status(error.status || 500).json({
        error: error.message,
    });
});

module.exports= apiRouter;