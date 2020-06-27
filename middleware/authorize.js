'use strict';

// This module is used to authorize the user when they try to go to a route to do something in the app
/**
 * permissions
 * @module permissions
 */

 /**
  * permissions authenticates the user
  * @param capability
  * @param request
  * @param response
  * @param next
  * @function permissions
  * @returns {object}
  */

const UserModel = require('../lib/models/users/users-model.js');
const User = new UserModel();

const permissions = (capability) => async(request, response, next) => {
  let userInfo = await User.getByName(request.user.username);
  let user = User;
  user.makeTempUser(userInfo);
  console.log(user);
  let hasPermission = await user.verifyPermissions(capability);
  if (hasPermission) {
      next();
  } else {
      next('Access Denied');
  }
};


module.exports = permissions;
