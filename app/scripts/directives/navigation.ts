/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
'use strict';

interface INavigationScope extends ng.IScope {
    items: any;
    cssClass(hash: string): string;
}

class NavigationDirective {

    constructor() {
        var directive: ng.IDirective = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/partials/navigation.html';
        directive.replace = true;

        directive.link = (scope: INavigationScope) => {
            scope.items = [
                {
                    name: 'Home',
                    hash: '#/'
                },
                {
                    name: 'Minions',
                    hash: '#/minions'
                },
                {
                    name: 'Pods',
                    hash: '#/pods'
                },
                {
                    name: 'Replication Controller',
                    hash: '#/rc'
                },
                {
                    name: 'Services',
                    hash: '#/services'
                },
                {
                    name: 'Events',
                    hash: '#/events'
                }
            ];
            scope.cssClass = (hash: string): string => {
                if (location.hash === hash) {
                    return 'active';
                }
                return '';
            };
        };

        return directive;
    }
}

sextant.directive('navigation', [ NavigationDirective ]);