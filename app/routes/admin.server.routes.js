'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  admin = require('../../app/controllers/admin.server.controller');

module.exports = function(app) {
  app.route('/seed')
    .get(admin.hasAdminAuthorization, admin.loadSeed);

  app.route('/approve')
    .get(admin.hasAdminAuthorization, admin.approveMentor);

  app.route('/delete')
    .get(admin.hasAdminAuthorization, admin.deleteAccount);

  app.route('/reactivate')
    .get(admin.hasAdminAuthorization, admin.reactivate);

};
