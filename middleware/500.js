'use strict';

//Module that handles 500 errors (server errors)

/**
 * 500
 * @module 500
 */

 /**
  * 500 - will return a status
  * @param {*} request 
  * @param {*} response 
  * @returns {status}
  */

module.exports = (request, response) => {
  console.log('__ERROR!!__ :: 500');
  response.status(500).send('Server error');
}