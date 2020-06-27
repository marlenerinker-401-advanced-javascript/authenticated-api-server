'use strict';

//Module that logs the request information to the console

/**
 * Logger
 * @module logger
 */

 /**
  * logger returns a console log of the request
  * @param {*} request 
  * @param {*} response 
  * @param {*} next
  * @returns {console.log}
  */

module.exports = (request, response, next) => {

  console.log('__REQUEST__ :: ' + request.path + ' ' + request.method + ' ' + request.requestTime);
  next();
}