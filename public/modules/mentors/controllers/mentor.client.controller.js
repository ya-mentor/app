'use strict';

angular.module('mentors').controller('MentorController', ['$scope', '$http', '$location', 'Authentication', 'Mentors', '$stateParams',
    function($scope, $http, $location, Authentication, Mentors, $stateParams) {
        $scope.authentication = Authentication;

        $scope.mentors = Mentors.query();
        $scope.mentor = Mentors.get({
            mentorId: $stateParams.mentorId
        });

    }
]);
