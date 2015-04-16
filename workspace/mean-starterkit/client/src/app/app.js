(function () {
    'use strict';

    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // Route config
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');

        // States
        $stateProvider
            // Home
            .state('home', {
                url: '/',
                views: {
                    'content@': {
                        controller: 'HomeController',
                        controllerAs: 'vm',
                        template: 'Hello world'
                    }
                },
                data: {
                    pageTitle: 'Home'
                }
            });
    }

    function run() {}

    function AppController() {}

    angular
        .module('app', [
            'app.home',
            'ui.router'
        ])
        .config(config) // 1st
        .run(run) // 2nd
        .controller('AppController', AppController); // 3rd

}());