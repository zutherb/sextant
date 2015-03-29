/// <reference path="../app.ts"/>

sextant.directive("containers", [():ng.IDirective => {
    var directive:ng.IDirective = {};

    directive.restrict = "AE";
    directive.templateUrl = "/partials/containers.html";
    directive.replace = true;

    directive.scope = {
        data: "=data"
    };

    return directive;
}]);