/// <reference path="../services/minion.ts"/>

interface IMinionListScope extends ng.IScope {
    vm: MinionListController;
}

class MinionListController {
    minions: IMinion [];

    static $inject = ['$scope', '$routeParams', 'minionService'];

    constructor(private $scope,
                private $routeParams,
                private minionService: IMinionService) {

        minionService.getMinionList().then((data: IMinionList) =>  {
            this.minions = data.items;
        });

        $scope.vm = this;
    }
}

sextant.controller('minionListController', MinionListController);
