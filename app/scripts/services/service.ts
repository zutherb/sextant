/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface ILoadBalancerService {
    getLoadBalancerList(): ng.IPromise <kubernetes.ILoadBalancerList>;
    getLoadBalancer(id: string): ng.IPromise <kubernetes.ILoadBalancer>;
    delete(loadBalancer: kubernetes.ILoadBalancer): ng.IPromise <any>;
    saveOrUpdate(loadBalancer: kubernetes.ILoadBalancer): void;
}

class LoadBalancerService extends BaseService implements ILoadBalancerService {
    static $inject: string [] = ['$http', '$q', '$rootScope', 'configuration'];

    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope;


    constructor(private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $rootScope: ng.IScope,
                protected configuration: sextant.IConfiguration) {
        super(configuration);
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
    }

    getLoadBalancerList(): ng.IPromise <kubernetes.ILoadBalancerList> {
        var deferred: ng.IDeferred<kubernetes.ILoadBalancerList> = this.qService.defer();
        this.httpService.get(this.configuration.LOADBALANCER_SERVICE_URL, this.newDefaultRequestConfig())
            .success((data: kubernetes.ILoadBalancerList) => deferred.resolve(data))
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    getLoadBalancer(id: string): ng.IPromise <kubernetes.ILoadBalancer> {
        var deferred: ng.IDeferred<kubernetes.ILoadBalancer> = this.qService.defer();
        this.httpService.get(this.configuration.LOADBALANCER_SERVICE_URL + '/' + id, this.newDefaultRequestConfig())
            .success((data: kubernetes.ILoadBalancer) => deferred.resolve(data))
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    delete(loadBalancer: kubernetes.ILoadBalancer): ng.IPromise <any> {
        var deferred: ng.IDeferred<kubernetes.ILoadBalancer> = this.qService.defer();
        this.httpService.delete(this.configuration.LOADBALANCER_SERVICE_URL + '/' + loadBalancer.id, this.newDefaultRequestConfig())
            .success((data: kubernetes.ILoadBalancer) => deferred.resolve(data))
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    saveOrUpdate(loadBalancer: kubernetes.ILoadBalancer): void {
        if (_.isEmpty(loadBalancer.id)) {
            this.httpService.post(this.configuration.LOADBALANCER_SERVICE_URL + '/' + loadBalancer.id,
                                  loadBalancer,
                                  this.newDefaultRequestConfig())
                .success((data: kubernetes.ILoadBalancer) => data)
                .error((error: any) => {
                    console.log(error);
                });
        } else {
            this.httpService.put(this.configuration.LOADBALANCER_SERVICE_URL + '/' + loadBalancer.id,
                                 loadBalancer,
                                 this.newDefaultRequestConfig())
                .success((data: kubernetes.ILoadBalancer) => data)
                .error((error: any) => {
                    console.log(error);
                });
        }

    }
}

sextant.service('loadBalancerService', LoadBalancerService);
