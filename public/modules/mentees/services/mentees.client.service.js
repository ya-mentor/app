'use strict';

// mentees service used for communicating with the mentees REST endpoint
angular.module('mentees').factory('Mentees', ['$resource',
    function($resource) {
        return $resource('mentees/:menteeId', {
            menteeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
