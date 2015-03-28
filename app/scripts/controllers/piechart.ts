/// <reference path="../services/pod.ts"/>

class PieChartController {
    progression: number = 10;
    total: number = 10;

    static $inject = ['$scope', '$routeParams', 'podService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private podService:IPodService,
                private configuration:sextant.IConfiguration) {

        podService.getPodList().then((data: kubernetes.IPodList) => {
            this.total = data.items.length;
            this.progression = _.filter(data.items, (pod: kubernetes.IPod) => {
                pod.currentState.status == 'Running';
            }).length;
        });

        $scope.vm = this;
    }
}

sextant.controller('pieChartController', PieChartController);
