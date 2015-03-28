/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>

interface IPodService {
    getPodList(): ng.IPromise <kubernetes.IPodList>
    deletePod(podId: string): ng.IPromise <void>
}

class PodService implements IPodService {
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope;

    static $inject = ['$http', '$q', '$rootScope', 'configuration'];

    constructor(private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $rootScope: ng.IScope,
                private configuration: sextant.IConfiguration) {
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
    }

    getPodList(): ng.IPromise <kubernetes.IPodList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.POD_SERVICE_URL)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {});
        return deferred.promise;
    }

    deletePod(podId: string): ng.IPromise <any> {
        var deferred = this.qService.defer();
        this.httpService.delete(this.configuration.POD_SERVICE_URL + "/" + podId)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {});
        return deferred.promise;
    }
}

sextant.service('podService', PodService);