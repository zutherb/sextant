/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IReplicationControllerService {
    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList>;
    delete(rc: kubernetes.IReplicationController): ng.IPromise <any>;
    update(rc: kubernetes.IReplicationController): void;
}

class ReplicationControllerService extends BaseService implements IReplicationControllerService {
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

    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList> {
        var deferred: ng.IDeferred<kubernetes.IReplicationControllerList> = this.qService.defer();
        this.httpService.get(this.configuration.RC_SERVICE_URL, this.newDefaultRequestConfig())
            .success((data: kubernetes.IReplicationControllerList) => deferred.resolve(data))
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    delete(rc: kubernetes.IReplicationController): ng.IPromise <any> {
        var deferred: ng.IDeferred<any> = this.qService.defer();
        var config: ng.IRequestShortcutConfig = this.newDefaultRequestConfig();
        this.httpService.delete(this.configuration.RC_SERVICE_URL + '/' + rc.id, config)
            .success((data: any) => {
                deferred.resolve(data);
            })
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    update(rc: kubernetes.IReplicationController): void {
        var config: ng.IRequestShortcutConfig = this.newDefaultRequestConfig();
        this.httpService.put(this.configuration.RC_SERVICE_URL + '/' + rc.id, rc, config)
            .success((data: kubernetes.IReplicationController) => {
                console.log(data);
            })
            .error((error: any) => {
                console.log(error);
            });
    }
}

sextant.service('rcService', ReplicationControllerService);
