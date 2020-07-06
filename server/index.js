//Server
const PORT  = process.env.PORT || 3000;
const express = require ('express');
const server = express();
const chalk = require('chalk')
const path = require('path')

// static files:
const DIST_PATH = path.join(__dirname, './dist' )
server.use(express.static(DIST_PATH))

// bring in the DB connection:
const { client  } = require('./db/client');

server.listen(PORT, ()=>{
    console.log(chalk.cyan('Server is up on port', PORT))
 
    try {
        await client.connect();
        console.log('Database is open for business!');
      } catch (error) {
        console.error("Database is closed for repairs!\n", error);
      }

});

// check health of server:
server.get('/health', (req, res, next)=>{
    res.send('Server is active');
  })

// here's our API:
const apiRouter = require('./routes');
server.use('/api', apiRouter);
