/// <reference path="../services/pod.ts"/>

interface IPodListScope extends ng.IScope {
    vm: PodListController;
    rowClass(index: number): string;
    deletePod(index: number): void;
}

class PodListController {
    pods: IPod [];
    displayedPods: IPod [];

    static $inject = ['$scope', '$routeParams', 'podService'];

    constructor(private $scope,
                private $routeParams,
                private podService: IPodService) {

        podService.getPodList().then((data: IPodList) =>  {
            this.pods = data.items;
            this.displayedPods = [].concat(data.items);
        });

        $scope.vm = this;
    }

    rowClass(index: number): string {
        if(this.displayedPods[index].currentState.status == 'Running') {
            return 'success'
        }
        if(this.displayedPods[index].currentState.status == 'Pending' ||
           this.displayedPods[index].currentState.status == 'Waiting' ||
           this.displayedPods[index].currentState.status == 'Unknown') {
            return 'warning'
        }
        return 'danger'
    }

    deletePod(index: number): void {
        var podId = this.displayedPods[index].id;
        this.podService.deletePod(podId).then(() => {
            this.podService.getPodList().then((data: IPodList) =>  {
                this.displayedPods = data.items;
            });
        });
    }
}

sextant.controller('podListController', PodListController);
