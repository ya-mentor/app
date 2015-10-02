'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  extend = require('mongoose-schema-extend'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
  return (this.provider !== 'local' || (password && password.length > 6));
};

var RequestSchema = new Schema({
  from: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected']
  },
});

/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  email: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: 'testing error message',
    required: 'Please fill in a username',
    trim: true
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  address: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: ''
  },
  rating: [{
    by: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }]
}, {
  collection: 'users',
  discriminatorKey: '_type'
});


// Mentor Fields: LinkedIn: Str
// Skills: Array

// Learner Fields:


var MentorSchema = UserSchema.extend({
  linkedIn: {
    type: String,
    default: ''
  },
  skills: [{
    type: String,
    index: true
  }],
  role: {
    type: String,
    enum: ['mentor'],
    required: 'Role is req'
  },
  requests: [RequestSchema]
});

var LearnerSchema = UserSchema.extend({
  pitch: {
    type: String
  },
  interests: [{
    type: String,
    index: true
  }],
  role: {
    type: String,
    enum: ['learner'],
    required: 'Role is req'
  }
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

MentorSchema.pre('save', function(next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

LearnerSchema.pre('save', function(next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
    return password;
  }
};

MentorSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
    return password;
  }
};

LearnerSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

MentorSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

LearnerSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

MentorSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

LearnerSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('User', UserSchema);
mongoose.model('Mentor', MentorSchema);
mongoose.model('Learner', LearnerSchema);
mongoose.model('Request', RequestSchema);
