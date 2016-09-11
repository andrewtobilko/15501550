angular.module('15501550', ['ngRoute'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/lab1', {
                templateUrl: 'labs/1/template.html',
                controller: 'FirstLabController',
                controllerAs: 'ctrl'
            });

    }]);
