/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>


interface INavigationScope extends ng.IScope {
    items: any;
    cssClass(hash :string): string;
}

sextant.directive("navigation", [(): ng.IDirective => {
    var directive:ng.IDirective = {};

    directive.restrict = "AE";
    directive.templateUrl = "/partials/navigation.html";
    directive.replace = true;

    directive.link = (scope: INavigationScope) => {
        scope.items = [
            {
                name: "Home",
                hash: "#/"
            },
            {
                name: "Minions",
                hash: "#/minions"
            },
            {
                name: "Pods",
                hash: "#/pods"
            },
            {
                name: "Replication Controller",
                hash: "#/rc"
            },
            {
                name: "Services",
                hash: "#/services"
            },
            {
                name: "Events",
                hash: "#/events"
            }
        ]
        scope.cssClass = (hash: string): string => {
            if(location.hash == hash) {
                return "active";
            }
            "";
        }
    };





    return directive;
}]);