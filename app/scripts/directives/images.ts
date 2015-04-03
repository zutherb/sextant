/// <reference path="../app.ts"/>
'use strict';

sextant.directive("images", [(): ng.IDirective => {
    var directive:ng.IDirective = {};

    directive.restrict = "AE";
    directive.templateUrl = "/partials/images.html";
    directive.replace = true;

    directive.scope = {
        data: "=data"
    };

    return directive;
}]);