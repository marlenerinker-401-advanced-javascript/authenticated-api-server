'use strict';

// Module that contains extra routes for testing and the callback functions for the routes

/**
 * Extra Routes module
 * @module extra-routes
 */

 const express = require('express');
 const router = express.Router();
 const bearerMiddleware = require('../middleware/bearer.js');
 const permissions = require('../middleware/authorize.js');
 const UserModel = require('../lib/models/users/users-model.js');
 const User = new UserModel();

router.get('/secret', bearerMiddleware, (request, response) => {
  response.send(request.user);
});

router.get('/read', bearerMiddleware, permissions('read'), (request, response) => {
  response.send('Route /read worked');
});

router.post('/add', bearerMiddleware, permissions('create'), (request, response) => {
  response.send('Route /add worked');
});

router.put('/change', bearerMiddleware, permissions('update'), (request, response) => {
  response.send('Route /change worked');
});

router.delete('/remove', bearerMiddleware, permissions('delete'), (request, response) => {
  response.send('Route /remove worked');
});






module.exports=router;