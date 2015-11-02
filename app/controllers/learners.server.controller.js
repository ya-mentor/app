'use strict';


var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Learner = mongoose.model('Learner'),
  _ = require('lodash'),
  filters = require('./filters');


// exports.create
// Not needed. Signup happens in users controller



exports.list = function(req, res) {
  // TODO: paginate (for large no of learners)
  var filter = _.cloneDeep(filters.basecriteria);
  filter.role = 'learner';
  // if a learner is logged in (filter out his acct)
  if (req.user.role === 'learner') {
    filter._id = { $ne : req.user._id };
  }
  if (req.user.role === 'admin') {
    delete filter.isApproved;
    delete filter.isActive;
  }
  Learner.find(filter).sort('-created').exec(function(err, learners) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json({
        count: learners.length,
        data: learners
      });
    }
  });
};


exports.read = function(req, res) {
  res.json(req.learner);
};


exports.update = function(req, res) {
  var learner = req.learner;

  learner = _.extend(learner, req.body);

  learner.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(learner);
    }
  });
};

exports.delete = function(req, res) {
  var learner = req.learner;

  learner.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(learner);
    }
  });
};

exports.learnerByID = function(req, res, next, id) {
  Learner.findById(id).exec(function(err, learner) {
    if (err) return next(err);
    if (!learner) return next(new Error('Failed to find learner ' + id));
    req.learner = learner;
    next();
  });
};

exports.hasAuthorization = function(req, res, next, id) {
  if (req.user._id === req.learner._id) {
    next();
  } else {
    res.send(403, {
      message: 'Unauthorized'
    });
  }
};

//
// exports.getRequests = function(req, res, next, id){
// 	Mentors.find({_id: id}).select({requests: {$elemMatch: {from: req.user, status: 'pending'}}})
//				.populate('requests.from').exec(function(err, mentors){
// 		if(err){
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else{
// 			res.json(mentors);
// 		}
// 	});
// };
//
//
// exports.listMentors = function(req, res, next, id){
// 	Mentors.find({_id: id}).select({requests: {$elemMatch: {from: req.user, status: 'accepted'}}})
// .populate('requests.from').exec(function(err, mentors){
// 		if(err){
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else{
// 			res.json(mentors);
// 		}
// 	});
// };
