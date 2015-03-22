/// <reference path="types.ts"/>

var _:UnderscoreStatic;
var $:JQueryStatic;

var sextant = angular.module('sextant', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'sextant.config',
    'LocalStorageModule'
]).config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html'
        })
        .when('/events', {
            templateUrl: 'views/events.html'
        }).when('/minions', {
            templateUrl: 'views/minions.html'
        }).otherwise({
            templateUrl: 'views/404.html'
        });
}).config(['localStorageServiceProvider', (localStorageServiceProvider) => {
    localStorageServiceProvider.setPrefix('sextant');
}]);



