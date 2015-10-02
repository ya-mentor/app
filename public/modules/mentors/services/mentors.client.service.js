'use strict';

// mentors service used for communicating with the mentors REST endpoint
angular.module('mentors').factory('Mentors', ['$resource',
	function($resource) {
		return $resource('mentors/:mentorId',  {
      mentorId: '@_id'
    }, {
			update: {
				method: 'PUT'
			}
		});
	}
]);