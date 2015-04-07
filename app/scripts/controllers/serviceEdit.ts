/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/service.ts"/>
'use strict';

class LoadBalancerEditController {
    static $inject: string [] = ['$scope', '$routeParams', 'loadBalancerService', 'configuration'];

    service: kubernetes.ILoadBalancer;
    source: string;
    isNew: boolean;

    constructor(private $scope: any,
                private $routeParams: any,
                private loadBalancerService: ILoadBalancerService,
                private configuration: sextant.IConfiguration) {
        if (!_.isEmpty($routeParams.serviceid)) {
            loadBalancerService.getLoadBalancer($routeParams.serviceid).then((data: kubernetes.ILoadBalancer) => {
                this.service = data;
                this.source = JSON.stringify(data, undefined, 2);
                this.isNew = false;
            });
        } else {
            this.service = {};
            this.source = JSON.stringify(this.service);
            this.isNew = true;
        }
        $scope.vm = this;
    }

    update(): void {
        this.loadBalancerService.saveOrUpdate(this.service);
    }
}

sextant.controller('loadBalancerEditController', LoadBalancerEditController);
