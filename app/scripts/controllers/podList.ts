/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/pod.ts"/>
'use strict';

interface IPodListScope extends ng.IScope {
    vm: PodListController;
    rowClass(index:number): string;
    deletePod(index:number): void;
}

class PodListController {
    pods: kubernetes.IPod [] = [];
    displayedPods: kubernetes.IPod [] = [];
    itemsByPage: number;
    displayedPages: number;

    static $inject = ['$scope', '$routeParams', 'podService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private podService:IPodService,
                private configuration:sextant.IConfiguration) {

        podService.getPods().then((data: kubernetes.IPodList) => {
            this.pods = data.items;
            this.displayedPods = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }

    deletePod(index: number):void {
        var podId = this.displayedPods[index].id;
        this.podService.deletePod(podId).then(() => {
            this.podService.getPods().then((data: kubernetes.IPodList) => {
                this.displayedPods = data.items;
            });
        });
    }
}

sextant.controller('podListController', PodListController);
