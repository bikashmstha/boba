var app = angular.module('app', ['ngRoute', 'ngCovervid']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        redirectTo: '/home'
    })
    .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'mainCtrl'
    })
    .when('/first/:id', {
        templateUrl: 'partials/result.html',
        controller: 'resultsCtrl'
    })
    .otherwise({
        redirectTo: '/'
    })
})