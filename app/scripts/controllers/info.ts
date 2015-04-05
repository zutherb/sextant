/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/info.ts"/>
'use strict';

class InfoController {
    info: any;

    static $inject = ['$scope', '$routeParams', 'infoService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private infoService: IInfoService,
                private configuration: sextant.IConfiguration) {

        infoService.getBuildInfo().then((data: any) =>  {
            this.info = data
        });

        $scope.vm = this;
    }
}

sextant.controller('infoController', InfoController);
