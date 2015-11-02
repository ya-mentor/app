'use strict';

exports.basecriteria = {
  isActive: true,
  isApproved: true,
  role: {
    $ne: 'admin',
  }
};
