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
    static $inject: string [] = ['$scope', '$routeParams', 'minionService', 'dockerUiService'];

    minions: kubernetes.IMinion [] = [];

    constructor(private $scope: any,
                private $routeParams: any,
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
