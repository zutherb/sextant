/// <reference path="../services/pod.ts"/>

interface IPodListScope extends ng.IScope {
    vm: PodListController;
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
}

sextant.controller('podListController', PodListController);
