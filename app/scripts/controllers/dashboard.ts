/// <reference path="../services/pod.ts"/>

class DashboardController {
    podProgression: number = 0;
    podTotal: number = 0;

    minionProgression: number = 0;
    minionTotal: number = 0;

    static $inject = ['$scope', '$routeParams', 'minionService', 'podService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private minionService: IMinionService,
                private podService: IPodService,
                private configuration: sextant.IConfiguration) {

        podService.getPodList().then((data: kubernetes.IPodList) => {
            this.podTotal = data.items.length;
            this.podProgression = _.filter(data.items, (pod: kubernetes.IPod) => pod.currentState.status == 'Running').length;
        });

        minionService.getMinionList().then((data: kubernetes.IMinionList) => {
            this.minionTotal = data.items.length;
            this.minionProgression = _.filter(data.items, (minion: kubernetes.IMinion) => minion.status.conditions[0].kind == 'Ready').length;
        });

        $scope.vm = this;
    }
}

sextant.controller('dashboardController', DashboardController);
