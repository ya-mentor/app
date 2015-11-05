'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	learners = require('../../app/controllers/learners.server.controller');

module.exports = function(app) {
	app.route('/learners')
		.get(users.requiresLogin, learners.list); // only see other learners if you're a user

	app.route('/learners/:learnerId')
		.get(learners.read)
		.put(users.requiresLogin, learners.hasAuthorization, learners.update)
		.delete(users.requiresLogin, learners.hasAuthorization, learners.delete);

	app.route('/deactivate')
		.get(users.requiresLogin, users.hasAuthorization, learners.delete);

	// app.route('/learners/:id/requests')
	// 	.get(users.requiresLogin, users.hasAuthorization, learners.getRequests);

	// app.route('/learners/:id/mentors')
	// 	.get(users.requiresLogin, users.hasAuthorization, learners.listMentors);

	// Finish by binding the article middleware
	app.param('learnerId', learners.learnerByID);
};
