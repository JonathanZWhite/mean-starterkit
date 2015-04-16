(function() {
	'use strict';

	function HomeService() {
		var Landing = {};

		return Landing;
	}

	angular
	    .module('services.HomeService', [])
	    .factory('HomeService', HomeService);
})();