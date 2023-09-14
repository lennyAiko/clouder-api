/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /auth/signup': 'auth/signup',
  'POST /auth/signin': 'auth/signin',
  'POST /auth/refresh': 'auth/refresh-token',
  'POST /auth/forgot_password': 'auth/forgot-password',
  'POST /auth/reset_password': 'auth/reset-password',

  'GET /user/signout': 'user/signout',
  'GET /user/profile': 'user/profile'

};
