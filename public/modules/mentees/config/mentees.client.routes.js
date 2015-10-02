'use strict';

// Setting up route
angular.module('mentees').config(['$stateProvider',
	function($stateProvider) {
		// mentees state routing
		$stateProvider.
		state('mentees/profile', {
			url: '/settings/mentees/profile',
			templateUrl: 'modules/mentees/views/settings/edit-profile.client.view.html'
		}).
		state('mentees/password', {
			url: '/settings/mentees/password',
			templateUrl: 'modules/mentees/views/settings/change-password.client.view.html'
		}).
		state('mentees/accounts', {
			url: '/settings/mentees/accounts',
			templateUrl: 'modules/mentees/views/settings/social-accounts.client.view.html'
		}).
		state('mentees/signup', {
			url: '/mentees/signup',
			templateUrl: 'modules/mentees/views/authentication/signup.client.view.html'
		}).
		state('mentees/signin', {
			url: '/mentees/signin',
			templateUrl: 'modules/mentees/views/authentication/signin.client.view.html'
		}).
		state('mentees/forgot', {
			url: '/password/mentees/forgot',
			templateUrl: 'modules/mentees/views/password/forgot-password.client.view.html'
		}).
		state('mentees/reset-invalid', {
			url: '/password/reset/mentees/invalid',
			templateUrl: 'modules/mentees/views/password/reset-password-invalid.client.view.html'
		}).
		state('mentees/reset-success', {
			url: '/password/reset/mentees/success',
			templateUrl: 'modules/mentees/views/password/reset-password-success.client.view.html'
		}).
		state('mentees/mentors', {
			url: '/mentees/mentors',
			templateUrl: 'modules/mentees/views/dashboard/dashboard.mentors.view.html'
		}).
		state('mentee', {
			url: '/mentees/:mentee_id',
			templateUrl: 'modules/mentees/views/dashboard/mentee_profile.client.view.html'
		}).
		state('mentees/reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/mentees/views/password/reset-password.client.view.html'
		});
	}
]);