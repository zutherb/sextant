/// <reference path="../services/pod.ts"/>

interface IPodListScope extends ng.IScope {
    vm: PodListController;
    rowClass(index: number): string;
    deletePod(index: number): void;
}

class PodListController {
    pods: IPod [];

    static $inject = ['$scope', '$routeParams', 'podService'];

    constructor(private $scope,
                private $routeParams,
                private podService: IPodService) {

        podService.getPodList().then((data: IPodList) =>  {
            this.pods = data.items;
        });

        $scope.vm = this;
    }

    rowClass(index: number): string {
        if(this.pods[index].currentState.status == 'Running') {
            return 'success'
        }
        if(this.pods[index].currentState.status == 'Pending' ||
           this.pods[index].currentState.status == 'Waiting' ||
           this.pods[index].currentState.status == 'Unkown') {
            return 'warning'
        }
        return 'danger'
    }

    deletePod(index: number): void {
        var podId = this.pods[index].id;
        this.podService.deletePod(podId).then(() => {
            this.podService.getPodList().then((data: IPodList) =>  {
                this.pods = data.items;
            });
        });
    }
}

sextant.controller('podListController', PodListController);
