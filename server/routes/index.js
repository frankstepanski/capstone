const express = require('express');
const apiRouter = express.Router();

const morgan = require('morgan');
apiRouter.use(morgan('dev'));

const bodyParser = require('body-parser');
// shouldn't need json parsing middleware
// already done in main server file
apiRouter.use(bodyParser.json());


// Function to verify tokens when a request is made to the API:
const { getUserById } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

// great place to introduce caching
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const {id} = jwt.verify(token, SECRET);

            // add an else incase there is no id in decoded token
            if (id) {
                req.user = await getUserById(id);
                console.log(`req.user: `, req.user);
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

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports= apiRouter;
