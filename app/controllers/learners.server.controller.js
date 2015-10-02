'use strict';


var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Learner = mongoose.model('Learner'),
	_ = require('lodash');


exports.create = function(req, res) {
	var learner = new Learner(req.body);
	learner.user = req.user;

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



exports.list = function(req, res) {
	Learner.find().sort('-created').exec(function(err, learners) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(learners);
		}
	});
};



exports.read = function(req, res) {
	res.json(req.learner);
};


exports.update = function(req, res) {
	console.log(3)
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

exports.checkPermission = function(req, res, next, id) {
	if(req.user._id==req.learner._id){
		next();
	}else{
		res.send(403, {message: "Unauthorized"})
	}
};

//
// exports.getRequests = function(req, res, next, id){
// 	Mentors.find({_id: id}).select({requests: {$elemMatch: {from: req.user, status: 'pending'}}}).populate('requests.from').exec(function(err, mentors){
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
// 	Mentors.find({_id: id}).select({requests: {$elemMatch: {from: req.user, status: 'accepted'}}}).populate('requests.from').exec(function(err, mentors){
// 		if(err){
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else{
// 			res.json(mentors);
// 		}
// 	});
// };
