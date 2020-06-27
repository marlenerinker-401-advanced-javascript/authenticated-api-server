'use strict';

// Module that creates a timestamp in this format: Sat Jun 20 2020 17:46:07 GMT-0700 (Pacific Daylight Time)

/**
 * Timestamp
 * @module timestamp
 */
/**
 * timestamp returns the date and time the request was made
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns {variable}
 */

module.exports = (request, response, next) => {
  let t = new Date(Date.now());
  request.requestTime = t;
  next()
}

