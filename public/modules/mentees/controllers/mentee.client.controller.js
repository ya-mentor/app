angular.module('mentees').controller('menteeCntrl', ['$scope','$stateParams', 'Mentees', function($scope, $stateParams, Mentees) {
  
        $scope.mentees = Mentees.query();
        $scope.findOne = function() {
            $scope.mentee = Mentees.get({
                menteeId: $stateParams.menteeId
            });
        };

  $scope.mentees = [
    {
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaie',
      email: 'lydexmail@yahoo.com',
      stuff: 'student',
      bio: 'This is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti motoThis is the story of my life, itan aiye mi, nibo la wa gbe n lo, mi o ma le ti moto',
      joined_on: 'Setpteber 29th, 2015'
    },
    {
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },
    {
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },{
      picture: '/modules/mentees/img/me1.jpg',
      name: 'Agboola Olaide',
      email: 'lydexmail@yahoo.com',
      stuff: 'student'
    },
  ];

  $scope.thisMentee = {};
  $scope.display_mentee = function() {
    angular.forEach($scope.mentees, function(key, value) {
      if(key.name === "Agboola Olaie"){
        $scope.thisMentee = key;
      }
    });
  }
  $scope.display_mentee()

}]);