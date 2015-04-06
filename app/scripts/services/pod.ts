/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IPodService {
    getPods(): ng.IPromise <kubernetes.IPodList>
    getPod(podId: string): ng.IPromise <kubernetes.IPod>
    delete(pod: kubernetes.IPod): ng.IPromise <void>
}

class PodService extends BaseService implements IPodService {
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

    getPods(): ng.IPromise <kubernetes.IPodList> {
        var deferred: ng.IDeferred<kubernetes.IPodList> = this.qService.defer();
        this.httpService.get(this.configuration.PODS_GET_URL, this.newDefaultRequestConfig())
            .success((data: kubernetes.IPodList) => deferred.resolve(data))
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    getPod(podId: string): ng.IPromise <kubernetes.IPod> {
        var deferred: ng.IDeferred<kubernetes.IPod> = this.qService.defer();
        this.httpService.get(this.configuration.POD_GET_URL + '/' + podId, this.newDefaultRequestConfig())
            .success((data: kubernetes.IPod) => deferred.resolve(data))
            .error((error: any) => console.log(error));
        return deferred.promise;
    }

    delete(pod: kubernetes.IPod): ng.IPromise <void> {
        var deferred: ng.IDeferred<any> = this.qService.defer();
        this.httpService.delete(this.configuration.POD_DELETE_URL + '/' + pod.id, this.newDefaultRequestConfig())
            .success((data: any) => deferred.resolve(data))
            .error((error: any) => console.log(error));
        return deferred.promise;
    }
}

sextant.service('podService', PodService);