/// <reference path='../__all.ts'/>
/// <reference path='../app.ts'/>
/// <reference path='../types.ts'/>
/// <reference path='../services/pod.ts'/>
/// <reference path='../services/minion.ts'/>
/// <reference path='../services/rc.ts'/>
/// <reference path='../services/event.ts'/>
'use strict';

class DashboardController {
    podStatusReportLabels: string [] = [];
    podStatusReportData: number [] = [];
    podStatusReport: any;

    minionStatusReportLabels: string [] = [];
    minionStatusReportData: number [] = [];
    minionStatusReport: any;

    rcStatusReportLabels: string [] = [];
    rcReportData: any [] = [];
    rcStatusReport: any;

    eventStatusReportLabels: string [] = [];
    eventStatusReportSeries: string [] = ['Events per hour'];
    eventStatusReportData: any [] = [];
    eventStatusReport: any;

    lastTwoDaysEvents: kubernetes.IEvent [] = [];

    options = {
        animate : false,
        animateRotate : false,
        animateScale : false
    }

    static $inject = [  '$scope',
                        '$routeParams',
                        'minionService',
                        'podService',
                        'rcService',
                        'eventService',
                        'configuration' ];

    constructor(private $scope,
                private $routeParams,
                private minionService: IMinionService,
                private podService: IPodService,
                private rcService: IReplicationControllerService,
                private eventService: IEventService,
                private configuration: sextant.IConfiguration) {

        podService.getPods().then((data:kubernetes.IPodList) => {
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
            this.podStatusReport = podStatusReport;
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
            this.minionStatusReport = minionStatusReport;
        });

        rcService.getReplicationControllerList().then((data: kubernetes.IReplicationControllerList) => {
            var rcStatusReport = {};
            _.each(data.items, (rc: kubernetes.IReplicationController) => {
                rcStatusReport[rc.id] = {
                    desired: rc.desiredState.replicas,
                    current: rc.currentState.replicas
                };
            });
            this.rcStatusReportLabels = Object.keys(rcStatusReport);
            this.rcReportData[0] = [];
            this.rcReportData[1]= [];
            _.each(this.rcStatusReportLabels, (key) => {
                this.rcReportData[0].push(rcStatusReport[key].desired);
                this.rcReportData[1].push(rcStatusReport[key].current);
            });
            this.rcStatusReport = rcStatusReport;
        });

        eventService.getEventList().then((data: kubernetes.IEventList) => {
            var eventStatusReport = {};
            _.each(data.items, (event: kubernetes.IEvent) => {
                var timestamp = moment(event.timestamp);
                if(moment(event.timestamp).isAfter(moment().subtract(2, 'days'))){
                    for(var i = 0; i < 24; i++) {
                        var key: string = timestamp.year() + '/' + (timestamp.month() + 1) + '/' + timestamp.date() + ' ' + i + ':00';
                        if (eventStatusReport[key] === undefined) {
                            eventStatusReport[key] = 0;
                        }
                    }
                    var key: string = timestamp.year() + '/' + (timestamp.month() + 1) + '/' + timestamp.date() + ' ' + timestamp.hour() + ':00';
                    if (eventStatusReport[key] === undefined) {
                        eventStatusReport[key] = 0;
                    }
                    eventStatusReport[key] = eventStatusReport[key] + 1;
                }
            });

            this.eventStatusReportLabels = Object.keys(eventStatusReport);
            this.eventStatusReportData[0] = [];
            _.each(this.eventStatusReportLabels, (key) => {
                this.eventStatusReportData[0].push(eventStatusReport[key]);
            });
            this.eventStatusReport = eventStatusReport;
        });

        $scope.vm = this;
    }

    onClick(points, evt) {
        console.log(points, evt);
    }
}

sextant.controller('dashboardController', DashboardController);
