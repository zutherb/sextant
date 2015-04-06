/// <reference path="../app.ts"/>
'use strict';

class ImagesDirective {

    constructor() {
        var directive: ng.IDirective = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/partials/images.html';
        directive.replace = true;

        directive.scope = {
            data: '=data'
        };

        return directive;
    }
}

sextant.directive('images', [ ImagesDirective ]);