'use strict';

//Module that sets up the server.

/**
 * Simple Server
 * @module server
 */

const express = require('express');


const apiRouter = require('../routes/api.js');
const logger = require('../middleware/logger.js');
const error404 = require('../middleware/404.js');
const error500 = require('../middleware/500.js');
const timestamp = require('../middleware/timestamp.js');
const authRouter = require('../routes/authorization.js');
const testAuth = require('../routes/extra-routes.js');
const app = express();

app.use(express.json());
app.use(timestamp);
app.use(logger);

app.get('/', (request, response) => {
  response.send('Welcome to my API. It uses these routes: <br> /api/products <br> /api/categories');
});

app.use('/api', apiRouter);
app.use('/', authRouter);
app.use('/', testAuth);

app.use('*', error404);
app.use(error500);



module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('server is up :::' + port);
    });
  }
}



