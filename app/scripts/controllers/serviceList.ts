/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/service.ts"/>
'use strict';

class LoadBalancerListController {
    static $inject: string [] = ['$scope', '$routeParams', 'loadBalancerService', 'configuration'];

    loadbalancers: kubernetes.ILoadBalancer [] = [];
    displayedLoadbalancers: kubernetes.ILoadBalancer [] = [];

    searchterm: string;
    itemsByPage: number;
    displayedPages: number;

    constructor(private $scope: any,
                private $routeParams: any,
                private loadBalancerService: ILoadBalancerService,
                private configuration: sextant.IConfiguration) {

        this.searchterm = $routeParams.searchterm;

        loadBalancerService.getLoadBalancerList().then((data: kubernetes.ILoadBalancerList) =>  {
            this.loadbalancers = data.items;
            this.displayedLoadbalancers = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }

    delete(loadBalancer: kubernetes.ILoadBalancer): void {
        this.loadBalancerService.delete(loadBalancer).then(() => {
            this.loadBalancerService.getLoadBalancerList().then((data: kubernetes.IPodList) => {
                this.loadbalancers = data.items;
            });
        });
    }
}

sextant.controller('loadBalancerListController', LoadBalancerListController);
