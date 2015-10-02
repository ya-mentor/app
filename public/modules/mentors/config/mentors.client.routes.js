'use strict';

// Setting up route
angular.module('mentors').config(['$stateProvider',
	function($stateProvider) {
		// mentors state routing
		$stateProvider.
		state('mentor-profile', {
			url: '/settings/mentor-profile',
			templateUrl: 'modules/mentors/views/settings/edit-profile.client.view.html'
		}).
		state('mentors/password', {
			url: '/settings/mentors/password',
			templateUrl: 'modules/mentors/views/settings/change-password.client.view.html'
		}).
		state('mentors/accounts', {
			url: '/settings/mentors/accounts',
			templateUrl: 'modules/mentors/views/settings/social-accounts.client.view.html'
		}).
		state('mentors/signup', {
			url: '/mentors/signup',
			templateUrl: 'modules/mentors/views/authentication/signup.client.view.html'
		}).
		state('chooseRole', {
			url: '/role',
			templateUrl: 'modules/mentors/views/authentication/signup.role.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/mentors/views/authentication/signin.client.view.html'
		}).
		state('mentors', {
			url: '/mentors',
			templateUrl: 'modules/mentors/views/dashboard/dashboard.mentors.view.html'
		}).
		state('mentor/:mentorId', {
			url: '/mentor/:mentorId',
			templateUrl: 'modules/mentors/views/profile/mentor.profile.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/mentors/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/mentors/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/mentors/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/mentors/views/password/reset-password.client.view.html'
		});
	}
]);