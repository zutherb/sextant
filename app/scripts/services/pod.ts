/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IPodService {
    getPods(): ng.IPromise <kubernetes.IPodList>
    getPod(podId: string): ng.IPromise <kubernetes.IPod>
    deletePod(podId: string): ng.IPromise <void>
}

class PodService extends BaseService implements IPodService {
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope;

    static $inject = ['$http', '$q', '$rootScope', 'configuration'];

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
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.PODS_GET_URL, this.newDefaultRequestConfig())
            .success((data) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    getPod(podId: string): ng.IPromise <kubernetes.IPod> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.POD_GET_URL + '/' + podId, this.newDefaultRequestConfig())
            .success((data:kubernetes.IPod) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    deletePod(podId: string): ng.IPromise <any> {
        var deferred = this.qService.defer();
        this.httpService.delete(this.configuration.POD_DELETE_URL + '/' + podId, this.newDefaultRequestConfig())
            .success((data) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }
}

sextant.service('podService', PodService);