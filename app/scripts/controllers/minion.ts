/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/minion.ts"/>
/// <reference path="../services/dockerui.ts"/>
/// <reference path="./dockerui.ts"/>
'use strict';

interface IMinionListScope extends ng.IScope {
    vm: MinionListController;
}

class MinionListController extends DockerUiController {
    minions: kubernetes.IMinion [] = [];

    static $inject = ['$scope', '$routeParams', 'minionService', 'dockerUiService'];

    constructor(private $scope,
                private $routeParams,
                private minionService: IMinionService,
                dockerUiService: DockerUiService) {
        super(dockerUiService);

        minionService.getMinionList().then((data: kubernetes.IMinionList) =>  {
            this.minions = data.items;
        });

        $scope.vm = this;
    }
}

sextant.controller('minionListController', MinionListController);
