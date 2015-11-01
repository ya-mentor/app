'use strict';


var mongoose = require('mongoose'),
  Learner = mongoose.model('Learner'),
  Mentor = mongoose.model('Mentor'),
  Admin = mongoose.model('Admin'),
  seed = require('./mongoose.seed.data');


exports.loadSeed = function(req, res) {
  var mentors = seed.mentors;
  var learners = seed.learners;

  Learner.create(learners, function(err, docs) {
    if (err) {
      if (err.code === 11000) {
        return res.json('Already seeded. Clear db to re-seed');
      }
      return res.json(err);
    }
    Mentor.create(mentors, function(err, docs) {
      if (err) {
        return res.json(err);
      }
      return res.json({
        'status': 'success'
      });
    });
  });
};

exports.hasAdminAuthorization = function(req, res, next, id) {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.send(403, {
      message: 'Unauthorized'
    });
  }
};

exports.hasAuthorization = function(req, res, next, id) {
  if (req.user.role === req.admin._id) {
    next();
  } else {
    res.send(403, {
      message: 'Unauthorized'
    });
  }
};

exports.adminByID = function(req, res, next, id) {
  Admin.findById(id).exec(function(err, admin) {
    if (err) return next(err);
    if (!admin) return next(new Error('Failed to find admin ' + id));
    req.admin = admin;
    next();
  });
};
