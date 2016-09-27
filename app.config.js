var app = angular.module('15501550', ['ngRoute'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/lab1', {
                templateUrl: 'labs/1/template.html',
                controller: 'FirstLabController',
                controllerAs: 'ctrl'
            })
            .when('/lab2', {
                templateUrl: 'labs/2/template.html',
                controller: 'SecondLabController',
                controllerAs: 'ctrl'
            });

    }]);
