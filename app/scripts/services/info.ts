/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IInfoService {
    getBuildInfo(): any;
}

class InfoService extends BaseService implements IInfoService {
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

    getBuildInfo(): any {
        var deferred: ng.IDeferred<any> = this.qService.defer();
        this.httpService.get('/info.json', this.newDefaultRequestConfig())
            .success((data: any) => deferred.resolve(data))
            .error((error: any) => {
                console.log(error);
            });
        return deferred.promise;
    }
}

sextant.service('infoService', InfoService);