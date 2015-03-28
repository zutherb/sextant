/// <reference path="../services/pod.ts"/>

class DashboardController {
    podStatusReportLabels:string [] = [];
    podStatusReportData:number [] = [];

    minionStatusReportLabels:string [] = [];
    minionStatusReportData:number [] = [];

    options = {
        animateRotate : false,
        animateScale : false
    }

    static $inject = ['$scope', '$routeParams', 'minionService', 'podService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private minionService:IMinionService,
                private podService:IPodService,
                private configuration:sextant.IConfiguration) {

        podService.getPodList().then((data:kubernetes.IPodList) => {
            var podStatusReport = {};
            _.each(data.items, (pod: kubernetes.IPod) => {
                if (podStatusReport[pod.currentState.status] === undefined) {
                    podStatusReport[pod.currentState.status] = 0;
                }
                podStatusReport[pod.currentState.status] = podStatusReport[pod.currentState.status] + 1;
            });
            this.podStatusReportLabels = Object.keys(podStatusReport);
            _.each(this.podStatusReportLabels, (key) => {
                this.podStatusReportData.push(podStatusReport[key]);
            });
        });

        minionService.getMinionList().then((data: kubernetes.IMinionList) => {
            var minionStatusReport = {};
            _.each(data.items, (minion: kubernetes.IMinion) => {
                if (minionStatusReport[minion.status.conditions[0].kind] === undefined) {
                    minionStatusReport[minion.status.conditions[0].kind] = 0;
                }
                minionStatusReport[minion.status.conditions[0].kind] = minionStatusReport[minion.status.conditions[0].kind] + 1;
            });
            this.minionStatusReportLabels = Object.keys(minionStatusReport);
            _.each(this.minionStatusReportLabels, (key) => {
                this.minionStatusReportData.push(minionStatusReport[key]);
            });
        });

        $scope.vm = this;
    }
}

sextant.controller('dashboardController', DashboardController);
