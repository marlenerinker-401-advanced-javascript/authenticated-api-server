'use strict';

// This module is used to authenticate the user when they try to go to a route to do something in the app.
/**
 * bearer authorization
 * @module bearer
 */

 /**
  * bearer authenticates the user
  * @param request
  * @param response
  * @param next
  * @function bearer
  * @returns {object}
  */

const UserModel = require('../lib/models/users/users-model.js')

async function bearer(request, response, next){

  if (!request.headers.authorization) {
    response.status(401).send('No authorization headers');
  }

  let [authType, token] = request.headers.authorization.split(' ');

  let validUser = await UserModel.validateToken(token);

  if (validUser) {
    request.user = validUser;
    next();
  } else {
    next('Invalid Token');
  }
}

module.exports = bearer;