/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IInfoService {
    getBuildInfo(): any;
}

class InfoService extends BaseService implements IInfoService {
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope;

    static $inject = ['$http', '$q', '$rootScope', 'configuration'];

    constructor(private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $rootScope: ng.IScope,
                protected configuration: sextant.IConfiguration) {
        super(configuration)
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
    }

    getBuildInfo(): any {
        var deferred = this.qService.defer();
        this.httpService.get('/info.json', this.newDefaultRequestConfig())
            .success((data) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }
}

sextant.service('infoService', InfoService);