/// <reference path="../services/minion.ts"/>
/// <reference path="../services/dockerui.ts"/>

interface IMinionListScope extends ng.IScope {
    vm: MinionListController;
}

class MinionListController {
    minions: kubernetes.IMinion [];
    dockerUiPods: kubernetes.IPod [];

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
        var pods = _.filter(this.dockerUiPods, (pod: kubernetes.IPod) => pod.currentState.hostIP == hostIP);
        return _.isEmpty(pods);
    }

    getDockerUiPort(hostIP: string): number {
        var pods = _.filter(this.dockerUiPods, (pod: kubernetes.IPod) => pod.currentState.hostIP == hostIP);
        return pods[0].desiredState.manifest.containers[0].ports[0].hostPort;
    }
}

sextant.controller('minionListController', MinionListController);
