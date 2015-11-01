'use strict';

exports.basecriteria = {
  isActive: true,
  role: {
    $ne: 'admin',
  }
};
