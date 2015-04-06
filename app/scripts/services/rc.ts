/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IReplicationControllerService {
    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList>;
    update(rc: kubernetes.IReplicationController): void;
}

class ReplicationControllerService extends BaseService implements IReplicationControllerService {
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

    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.RC_SERVICE_URL, this.newDefaultRequestConfig())
            .success((data) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }

    update(rc: kubernetes.IReplicationController): void {
        var config = this.newDefaultRequestConfig();
        this.httpService.put(this.configuration.RC_SERVICE_URL + '/' + rc.id, rc, config)
            .success((data) => {
                console.log(data);
            })
            .error((error:any) => {
                console.log(error);
            });
    }
}

sextant.service('rcService', ReplicationControllerService);