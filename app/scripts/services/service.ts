/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
'use strict';

interface ILoadBalancerService {
    getLoadBalancerList(): ng.IPromise <kubernetes.ILoadBalancerList>
    getLoadBalancer(id: string): ng.IPromise <kubernetes.ILoadBalancer>
    saveOrUpdate(loadBalancer: kubernetes.ILoadBalancer): void;
}

class LoadBalancerService implements ILoadBalancerService {
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope;
    private timeoutService: ng.ITimeoutService;

    static $inject = ['$http', '$q', '$rootScope', '$timeout', 'configuration'];

    constructor(private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $rootScope: ng.IScope,
                private $timeout: ng.ITimeoutService,
                private configuration: sextant.IConfiguration) {
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
        this.timeoutService = $timeout;
    }

    getLoadBalancerList(): ng.IPromise <kubernetes.ILoadBalancerList> {
        var deferred = this.qService.defer();
        this.timeoutService(() => {
            this.httpService.get(this.configuration.LOADBALANCER_SERVICE_URL)
                .success((data) => deferred.resolve(data))
                .error((error:any) => {});
        }, this.configuration.TIMEOUT);
        return deferred.promise;
    }

    getLoadBalancer(id: string): ng.IPromise <kubernetes.ILoadBalancer> {
        var deferred = this.qService.defer();
        this.timeoutService(() => {
            this.httpService.get(this.configuration.LOADBALANCER_SERVICE_URL + '/' + id)
                .success((data) => deferred.resolve(data))
                .error((error:any) => {});
        }, this.configuration.TIMEOUT);
        return deferred.promise;
    }

    saveOrUpdate(loadBalancer: kubernetes.ILoadBalancer): void {
        this.timeoutService(() => {
            if(_.isEmpty(loadBalancer.id)){
                this.httpService.post(this.configuration.LOADBALANCER_SERVICE_URL + '/' + loadBalancer.id, loadBalancer)
                    .success((data) => data)
                    .error((error:any) => {});
            } else {
                this.httpService.put(this.configuration.LOADBALANCER_SERVICE_URL + '/' + loadBalancer.id, loadBalancer)
                    .success((data) => data)
                    .error((error:any) => {});
            }
        }, this.configuration.TIMEOUT);
    }
}

sextant.service('loadBalancerService', LoadBalancerService);