/// <reference path="../app.ts"/>

sextant.directive("keyvaluelist", [(): ng.IDirective => {
    var directive:ng.IDirective = {};

    directive.restrict = "AE";
    directive.templateUrl = "/partials/keyvaluelist.html";
    directive.replace = true;

    directive.scope = {
        data: "=data"
    };

    return directive;
}]);