/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/event.ts"/>
'use strict';

class FrameController {
    static $inject: string [] = ['$scope', '$routeParams'];

    url: string;

    constructor(private $scope: any,
                private $routeParams: any) {

        this.url = $routeParams.url;

        $scope.vm = this;
    }
}

sextant.controller('frameController', FrameController);
