/// <reference path="../app.ts"/>
'use strict';

class ContainersDirective implements ng.IDirective {
    constructor(){
        var directive:ng.IDirective = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/partials/containers.html';
        directive.replace = true;

        directive.scope = {
            data: '=data'
        };

        return directive;
    }
}

sextant.directive('containers', [ContainersDirective]);