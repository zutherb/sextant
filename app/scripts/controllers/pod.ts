/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/pod.ts"/>

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

        podService.getPodList().then((data: kubernetes.IPodList) => {
            this.pods = data.items;
            this.displayedPods = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }

    //rowClass(index: number):string {
    //    if (this.displayedPods[index].currentState.status == 'Running') {
    //        return 'success'
    //    }
    //    if (this.displayedPods[index].currentState.status == 'Pending' ||
    //        this.displayedPods[index].currentState.status == 'Waiting' ||
    //        this.displayedPods[index].currentState.status == 'Unknown') {
    //        return 'warning'
    //    }
    //    return 'danger'
    //}

    deletePod(index: number):void {
        var podId = this.displayedPods[index].id;
        this.podService.deletePod(podId).then(() => {
            this.podService.getPodList().then((data: kubernetes.IPodList) => {
                this.displayedPods = data.items;
            });
        });
    }
}

sextant.controller('podListController', PodListController);
