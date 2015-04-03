/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
'use strict';

interface IReplicationControllerService {
    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList>
}

class ReplicationControllerService implements IReplicationControllerService {
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

    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList> {
        var deferred = this.qService.defer();
        this.timeoutService(() => {
            this.httpService.get(this.configuration.RC_SERVICE_URL)
                .success((data) => deferred.resolve(data))
                .error((error:any) => {});
        }, this.configuration.TIMEOUT);
        return deferred.promise;
    }
}

sextant.service('rcService', ReplicationControllerService);