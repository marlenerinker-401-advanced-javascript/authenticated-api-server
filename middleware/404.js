'use strict';

//Module that handles 404 errors

/**
 * 404
 * @module 404
 */

 /**
  * 404 - will return a status
  * @param {*} request 
  * @param {*} response 
  * @returns {status}
  */



module.exports = (request, response) => {
  console.log('__ERROR!!__ :: '+ request.path + ' not found');
  response.status(404).send('Can\'t ' + request.method + ' ' + request.path);
}