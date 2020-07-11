//Server
const express = require ('express');
const path = require('path');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const { sync } = require("./db/index");
const { seed } = require("./db/seed");

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || true;

const server = express();

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.json());

server.use((req, res, next) => {
  console.log("<----Body Logger START---->");
  console.log(req.body);
  console.log("<----Body Logger END---->");

  next();
});

// here's our API:
const apiRouter = require('./routes');
server.use('/api', apiRouter);

server.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: error.toString(),
  });
  next();
});

// check health of server:
server.get('/health', (req, res, next)=>{
  res.send('Server is active');
})

// static files:
const DIST_PATH = path.join(__dirname, '../dist' );
server.use(express.static(DIST_PATH));

const startServer = new Promise((resolve) => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    resolve();
  });
});

sync(FORCE)
  .then(seed)
  .then(startServer)
  .catch((error) => {
    console.error(`SERVER FAILED TO START: ${error.toString()}`);
  });