'use strict';

// This module is used to authenticate the user when they sign in to the app.
/**
 * basic authorization
 * @module basicAuth
 */

 /**
  * basicAuth authenticates the user
  * @param request
  * @param response
  * @param next
  * @function basicAuth
  * @returns {object}
  */

const base64 = require('base-64');

const UserModel = require('../lib/models/users/users-model.js');

//does the authentication like in class example
async function basicAuth(request, response, next) {
  

  // strings from our auth header
  let [authtype, authString] = request.headers.authorization.split(' ');
  let [username, password] = base64.decode(authString).split(':');

  // let verified = users[username] ? await bcrypt.compare(password, users[username].password) : false;
  let user = await UserModel.authenticateUser(username, password);

  if (user) {
    request.user = user;
    next();
  } else {
    next('Invalid login');
  }

  return 0;
}

module.exports = basicAuth;