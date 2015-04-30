(function() {
	'use strict';

	function HomeService() {
		var Home = {};

		return Home;
	}

	angular
	    .module('services.HomeService', [])
	    .factory('HomeService', HomeService);
})();