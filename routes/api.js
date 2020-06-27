'use strict';

//Module that contains the API routes and the callback functions for the routes.


/**
 * API module
 * @module api
 */

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middleware/bearer.js');
const permissions = require('../middleware/authorize.js');
const getModel = require('../middleware/getModel.js');


router.param('model', getModel);

router.post('/:model', bearerMiddleware, permissions('create'), addOne);
router.get('/:model', bearerMiddleware, getAll);
router.get('/:model/:id', bearerMiddleware, getOne);
router.put('/:model/:id', bearerMiddleware, permissions('update'), updateOne);
router.delete('/:model/:id', bearerMiddleware, permissions('delete'), deleteOne);

/**
 * addOne - adds one thing to the database
 * @function addOne
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */


function addOne(request, response){
  request.model.create(request.body)
  .then (results => response.send(results))
  .catch(err => response.send(err));
}

/**
 * getAll - gets all of the requested things from the database
 * @function getAll
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */

function getAll(request, response){
  request.model.get()
    .then(results => response.send(results))
    .catch(err => response.send(err));
}

/**
 * getOne - gets the requested thing from the database
 * @function getOne
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */

function getOne(request, response){
  request.model.get(request.params.id)
    .then(results => response.send(results))
    .catch(err => response.send(err));
}

/**
 * updateOne - updates a thing in the database
 * @function updateOne
 * @param {*} request 
 * @param {*} response 
 * @returns {string}
 */

function updateOne(request, response){
  request.model.update(request.params.id, request.body)
  .then (results => response.send(request.params.id + ' was updated'))
  .catch(err => response.send(err));

}

/**
 * deleteOne - deletes a thing from the database
 * @function deleteOne
 * @param {*} request 
 * @param {*} response 
 * @returns {string}
 */

function deleteOne(request, response){
  request.model.delete(request.params.id)
  .then (results => response.send(request.params.id + ' was deleted'))
  .catch(err => response.send(err));
}

module.exports = router;
