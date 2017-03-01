var app = angular.module('app', ['ngRoute', 'ngCovervid']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        redirectTo: '/boba'
    })
    .when('/boba', {
        templateUrl: 'partials/boba.html',
        controller: 'mainCtrl'
    })
    .when('/result', {
        templateUrl: 'partials/result.html',
        controller: 'mainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    })
})