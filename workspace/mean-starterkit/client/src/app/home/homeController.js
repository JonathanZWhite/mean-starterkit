(function() {
    'use strict';

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;

        (function init() {
            console.log('Initializing...');
        })();
    }

    angular
        .module('app.home')
        .controller('HomeController', HomeController);
})();