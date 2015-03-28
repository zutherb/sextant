/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>

class FrameController {
    url: string;

    static $inject = ['$scope', '$routeParams'];

    constructor(private $scope,
                private $routeParams) {

        this.url = $routeParams.url;

        $scope.vm = this;
    }
}

sextant.controller('frameController', FrameController);
