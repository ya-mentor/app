'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Mentor = mongoose.model('Mentor'),
  _ = require('lodash'),
  filters = require('./filters');

/**
 * Create a mentor
 */
exports.apply = function(req, res) {
  var mentor = new Mentor(req.body);
  // TODO: can also be used by admin to create a mentor acc
  // in which case set (isActive and isApproved to true)
  if (req.user.role === 'admin') {
    mentor.isApproved = true;
    mentor.isActive = true;
  }
  mentor.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if (req.user.role !== 'admin') {
      console.info('send email');
      // TODO: Send email (application received)
    }
    res.status(200).json({
      status: 'done'
    });
  });
};

exports.list = function(req, res) {
  // TODO: paginate (for large no of learners)
  var filter = _.cloneDeep(filters.basecriteria); // memory leak?
  filter.role = 'mentor';
  // if a mentor is logged in (filter out his acct)
  if (req.user.role === 'mentor') {
    filter._id = { $ne : req.user._id };
  }
  if (req.user.role === 'admin') {
    delete filter.isApproved;
    delete filter.isActive;
  }
  Mentor.find(filter).sort('-created').populate('user', 'userName').exec(function(err, mentors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json({
        count: mentors.length,
        data: mentors
      });
    }
  });
};

/**
 * Show the current mentor
 */
exports.read = function(req, res) {
  res.json(req.mentor);
};

/**
 * Update a mentor
 */
exports.update = function(req, res) {
  var mentor = req.mentor;

  mentor = _.extend(mentor, req.body);

  mentor.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mentor);
    }
  });
};

/**
 * Delete an mentor
 */
exports.delete = function(req, res) {
  var mentor = req.mentor;

  mentor.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json({
        mentor: mentor,
        status: 'deleted'
      });
    }
  });
};

/**
 * List of Mentors
 */

// .where({
//     role: 'mentor'
//   })



/**
 * Mentor middleware
 */
exports.mentorByID = function(req, res, next, id) {
  Mentor.findById(id).populate('user', 'userName').exec(function(err, mentor) {
    if (err) return next(err);
    if (!mentor) return next(new Error('Failed to load mentor ' + id));
    req.mentor = mentor;
    next();
  });
};

/**
 * Request middleware
 */
// exports.requestByID = function(req, res, next, id) {
//   Request.findById(id).populate('user', 'userName').exec(function(err, request) {
//     if (err) return next(err);
//     if (!request) return next(new Error('Failed to load request ' + id));
//     req.request = request;
//     next();
//   });
// };


exports.getRequests = function(req, res) {
  Mentor.find({
    _id: req.mentor.id
  }, {
    requests: {
      $elemMatch: {
        status: 'pending'
      }
    }
  }).populate('requests.from').exec(function(err, mentor) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mentor);
    }
  });
};

exports.getLearners = function(req, res) {
  Mentor.find({
    _id: req.mentor.id
  }, {
    requests: {
      $elemMatch: {
        status: 'accepted'
      }
    }
  }).exec(function(err, mentor) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mentor);
    }
  });

};

exports.requestMentor = function(req, res) {
  Mentor.findById(req.mentor.id, function(err, mentor) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    if (mentor.requests.length) {
      var match = _.find(mentor.requests, function(request) {
        return request.from.toString() === req.user.id;
      });
      if (typeof match !== 'undefined') {
        return res.status(400).send({
          message: 'You already requested this mentor'
        });
      }
    }
    mentor.requests.push({
      'from': req.user.id,
      'status': 'pending'
    });

    mentor.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).send({
          message: 'Request succesfully sent'
        });
      }
    });

  });
};

exports.acceptRequest = function(req, res) {
  var query = {
    'requests._id': req.params.requestId,
    'requests.status': 'pending'
  };

  var update = {
    'requests.$.status': 'accepted'
  };
  Mentor.update(query, update, function(err, rawMessage) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(200).send({
        message: 'Request has been accepted'
      });
    }
  });
};

exports.declineRequest = function(req, res) {
  var query = {
    'requests._id': req.params.requestId,
    'requests.status': 'pending'
  };
  var update = {
    'requests.$.status': 'rejected'
  };
  Mentor.update(query, update, function(err, rawMessage) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(200).send({
        message: 'Request has been declined'
      });
    }
  });
};

exports.upvoteMentor = function(req, res) {
  Mentor.findById(req.mentor.id, function(err, mentor) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    if (mentor.rating.length) {
      var match = _.find(mentor.rating, function(rating) {
        return rating.by.toString() === req.user.id;
      });
      if (typeof match !== 'undefined') {
        return res.status(400).send({
          message: 'You already upvoted this mentor'
        });
      }
    }
    mentor.rating.push({
      'by': req.user.id
    });

    mentor.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).send({
          message: 'You have upvoted this mentor'
        });
      }
    });
  });
};

// exports.downvoteMentor = function(req, res, next, id) {
//   Mentor.findById(req.mentor.id, function(err, mentor) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {

//       var index = mentor.reviews.indexOf(req.user.id);

//       if (index > -1) {

//         mentor.reviews.splice(index, 1);
//         return res.status(200).send({
//           message: 'You have downvoted your mentor'
//         });

//       } else {
//         res.status(403).send({
//           message: 'You cannot downcote this user'
//         });
//       }
//     }
//   });

//   Mentor.findById(req.mentor.id, function(err, mentor) {

//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     }

//     if (mentor.rating.length) {
//       var match = _.find(mentor.rating, function(rating) {
//         return rating.by.toString() === req.user.id;
//       })
//       if (typeof match !== 'undefined') {
//         return res.status(400).send({
//           message: 'You already upvoted this mentor'
//         });
//       }
//     }
//     mentor.rating.push({
//       'by': req.user.id
//     });

//     mentor.save(function(err) {
//       if (err) {
//         return res.status(400).send({
//           message: errorHandler.getErrorMessage(err)
//         });
//       } else {
//         res.status(200).send({
//           message: 'You have upvoted this mentor'
//         });
//       }
//   });

//   });
// };

// * Mentor authorization middleware
// */
exports.hasAuthorization = function(req, res, next) {
  if (req.mentor.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
