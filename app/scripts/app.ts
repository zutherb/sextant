/// <reference path="types.ts"/>

var sextant = angular.module('sextant', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js',
    'smart-table',
    'sextant.config',
    'LocalStorageModule'
]).config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html'
        })
        .when('/minions', {
            templateUrl: 'views/minions.html'
        })
        .when('/pods', {
            templateUrl: 'views/pods.html'
        })
        .when('/rc', {
            templateUrl: 'views/rc.html'
        })
        .when('/services', {
            templateUrl: 'views/services.html'
        })
        .when('/events', {
            templateUrl: 'views/events.html'
        })
        .when('/events/:searchterm', {
            templateUrl: 'views/events.html'
        })
        .when('/frame', {
            templateUrl: 'views/frame.html'
        })
        .otherwise({
            templateUrl: 'views/404.html'
        });
}).config(['localStorageServiceProvider', (localStorageServiceProvider) => {
    localStorageServiceProvider.setPrefix('sextant');
}]);



