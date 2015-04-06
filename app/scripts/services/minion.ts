/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IMinionService {
    getMinionList(): ng.IPromise <kubernetes.IMinionList>
}

class MinionService extends BaseService implements IMinionService {
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

    getMinionList(): ng.IPromise <kubernetes.IMinionList> {
        var deferred: ng.IDeferred<kubernetes.IMinionList> = this.qService.defer();
        this.httpService.get(this.configuration.MINION_SERVICE_URL, this.newDefaultRequestConfig())
            .success((data: kubernetes.IMinionList) => deferred.resolve(data))
            .error((error: any) => { console.log(error); });
        return deferred.promise;
    }
}

sextant.service('minionService', MinionService);