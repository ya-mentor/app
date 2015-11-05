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
        return res.status(400).json({
          err: 'Already seeded. Clear db to re-seed'
        });
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

exports.approveMentor = function(req, res) {
  var mentorId = req.query.id;
  var status = true;
  if (req.query.status === 'false') {
    status = false;
  }
  Mentor.findByIdAndUpdate(mentorId, {
    isApproved: status
  }, {
    new: true
  }, function(err, mentor) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({
      'status': 'success',
      'data': mentor
    });
  });
};

exports.deleteAccount = function(req, res) {
  var cb = function(err, user) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({
      'status': 'success',
      'data': user
    });
  };

  switch (req.query.status) {
    case 'mentor':
      Mentor.findByIdAndUpdate(req.id, {
        isActive: false
      }, {
        new: true
      }, cb);
    break;

    case 'learner':
      Learner.findByIdAndUpdate(req.id, {
        isActive: false
      }, {
        new: true
      }, cb);
    break;
  }
};

exports.useId = function(req, res, next, id) {
  if (id.toString().length) {
    req.id = id;
    return next();
  }
  res.status(400).json({message: 'Invalid id'});
};

exports.hasAdminAuthorization = function(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.send(403, {
      message: 'Unauthorized'
    });
  }
};

exports.hasAuthorization = function(req, res, next) {
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
