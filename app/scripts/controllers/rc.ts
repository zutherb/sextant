/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/rc.ts"/>
'use strict';

class ReplicationControllerListController {
    rcs: kubernetes.IReplicationController [] = [];
    displayedRcs: kubernetes.IReplicationController [] = [];

    searchterm: string;
    itemsByPage: number;
    displayedPages: number;

    static $inject = ['$scope', '$routeParams', 'rcService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private rcService: IReplicationControllerService,
                private configuration: sextant.IConfiguration) {

        this.searchterm = $routeParams.searchterm;

        rcService.getReplicationControllerList().then((data: kubernetes.IReplicationControllerList) =>  {
            this.rcs = data.items;
            this.displayedRcs = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }
}

sextant.controller('rcListController', ReplicationControllerListController);
