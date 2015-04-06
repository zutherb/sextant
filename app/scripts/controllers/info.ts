/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/info.ts"/>
'use strict';

class InfoController {
    static $inject: string [] = ['$scope', '$routeParams', 'infoService', 'configuration'];

    info: any;

    constructor(private $scope: any,
                private $routeParams: any,
                private infoService: IInfoService,
                private configuration: sextant.IConfiguration) {

        infoService.getBuildInfo().then((data: any) =>  {
            this.info = data;
        });

        $scope.vm = this;
    }
}

sextant.controller('infoController', InfoController);
