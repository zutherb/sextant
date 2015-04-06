/// <reference path="../app.ts"/>
'use strict';

class KeyValueListDirective {

    constructor() {
        var directive: ng.IDirective = {};

        directive.restrict = 'AE';
        directive.templateUrl = '/partials/keyvaluelist.html';
        directive.replace = true;

        directive.scope = {
            data: '=data'
        };

        return directive;
    }
}

sextant.directive('keyvaluelist', [ KeyValueListDirective ]);