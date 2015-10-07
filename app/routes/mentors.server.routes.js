'use strict';


/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  mentors = require('../../app/controllers/mentors.server.controller');

module.exports = function(app) {
  // Mentor Routes
  app.route('/mentors')
    .get(mentors.list)
    .post(users.requiresLogin, mentors.create);

  app.route('/mentors/:mentorId')
    .get(mentors.read)
    .put(users.requiresLogin, mentors.hasAuthorization, mentors.update)
    .delete(users.requiresLogin, mentors.hasAuthorization, mentors.delete);

  app.route('/mentors/:mentorId/requests')
    .get(users.requiresLogin, mentors.hasAuthorization, mentors.getRequests)
    .post(users.requiresLogin, mentors.requestMentor);

  app.route('/mentors/:mentorId/upvote')
    .post(users.requiresLogin, mentors.upvoteMentor);

  // app.route('/mentors/:mentorId/downvote')
  //   .post(users.requiresLogin, mentors.downvoteMentor);


  app.route('/mentors/:mentorId/learners')
    .get(users.requiresLogin, mentors.hasAuthorization, mentors.getLearners);

  app.route('/mentors/:mentorId/requests/:requestId/accept')
    .post(users.requiresLogin, mentors.hasAuthorization, mentors.acceptRequest);

  app.route('/mentors/:mentorId/requests/:requestId/decline')
    .post(users.requiresLogin, mentors.hasAuthorization, mentors.declineRequest);


  // Finish by binding the mentor middleware
  app.param('mentorId', mentors.mentorByID);

  // app.param('requestId', mentors.requestByID);

};
