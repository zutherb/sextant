/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/pod.ts"/>
'use strict';

interface IPodListScope extends ng.IScope {
    vm: PodListController;
    rowClass(index: number): string;
    deletePod(index: number): void;
}

class PodListController {
    static $inject: string [] = ['$scope', '$routeParams', 'podService', 'configuration'];

    pods: kubernetes.IPod [] = [];
    displayedPods: kubernetes.IPod [] = [];
    itemsByPage: number;
    displayedPages: number;

    constructor(private $scope: any,
                private $routeParams: any,
                private podService: IPodService,
                private configuration: sextant.IConfiguration) {

        podService.getPods().then((data: kubernetes.IPodList) => {
            this.pods = data.items;
            this.displayedPods = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }

    delete(pod: kubernetes.IPod): void {
        this.podService.delete(pod).then(() => {
            this.podService.getPods().then((data: kubernetes.IPodList) => {
                this.pods = data.items;
            });
        });
    }
}

sextant.controller('podListController', PodListController);
