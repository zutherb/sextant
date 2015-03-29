/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/minion.ts"/>
/// <reference path="../services/dockerui.ts"/>

interface IMinionListScope extends ng.IScope {
    vm: MinionListController;
}

class MinionListController {
    minions: kubernetes.IMinion [] = [];
    dockerUiPods: kubernetes.IPod [] = [];

    static $inject = ['$scope', '$routeParams', 'minionService', 'dockerUiService'];

    constructor(private $scope,
                private $routeParams,
                private minionService: IMinionService,
                private dockerUiService: DockerUiService) {

        minionService.getMinionList().then((data: kubernetes.IMinionList) =>  {
            this.minions = data.items;
        });

        dockerUiService.getPodList().then((data: kubernetes.IPodList) =>  {
            this.dockerUiPods = data.items;
        });

        $scope.vm = this;
    }

    isDockerUiNotRunningOnHost(hostIP: string): boolean {
        var pods = this.podsByHost(hostIP);
        return _.isEmpty(pods);
    }

    getDockerUiId(hostIP: string): string {
        var pods = this.podsByHost(hostIP);
        return pods[0].id;
    }

    private podsByHost(hostIP) {
        return _.filter(this.dockerUiPods, (pod:kubernetes.IPod) => pod.currentState.hostIP == hostIP);
    }
}

sextant.controller('minionListController', MinionListController);
