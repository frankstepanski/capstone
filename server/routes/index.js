const express = require('express');
const apiRouter = express.Router();

const morgan = require('morgan');
apiRouter.use(morgan('dev'));

const bodyParser = require('body-parser')
apiRouter.use(bodyParser.json());

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports= apiRouter;