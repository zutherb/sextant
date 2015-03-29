/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/service.ts"/>

class LoadBalancerListController {
    loadbalancers: kubernetes.ILoadBalancer [] = [];
    displayedLoadbalancers: kubernetes.ILoadBalancer [] = [];

    searchterm: string;
    itemsByPage: number;
    displayedPages: number;

    static $inject = ['$scope', '$routeParams', 'loadBalancerService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
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
}

sextant.controller('loadBalancerListController', LoadBalancerListController);
