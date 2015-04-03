/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
'use strict';

interface IPodService {
    getPods(): ng.IPromise <kubernetes.IPodList>
    getPod(podId: string): ng.IPromise <kubernetes.IPod>
    deletePod(podId: string): ng.IPromise <void>
}

class PodService implements IPodService {
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

    getPods(): ng.IPromise <kubernetes.IPodList> {
        var deferred = this.qService.defer();
        this.timeoutService(() => {
            this.httpService.get(this.configuration.PODS_GET_URL)
                .success((data) => deferred.resolve(data))
                .error((error:any) => {});
        }, this.configuration.TIMEOUT);
        return deferred.promise;
    }

    getPod(podId: string): ng.IPromise <kubernetes.IPod> {
        var deferred = this.qService.defer();
        this.timeoutService(() => {
            this.httpService.get(this.configuration.POD_GET_URL + "/" + podId)
                .success((data: kubernetes.IPod) => deferred.resolve(data))
                .error((error:any) => {});
        }, this.configuration.TIMEOUT);
        return deferred.promise;
    }

    deletePod(podId: string): ng.IPromise <any> {
        var deferred = this.qService.defer();
        this.timeoutService(() => {
            this.httpService.delete(this.configuration.POD_DELETE_URL, {params: {q: podId}})
                .success((data) => deferred.resolve(data))
                .error((error:any) => {});
        }, this.configuration.TIMEOUT);
        return deferred.promise;
    }
}

sextant.service('podService', PodService);