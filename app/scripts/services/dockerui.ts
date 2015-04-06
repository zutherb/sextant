/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IDockerUiService {
    getPodList(): ng.IPromise <kubernetes.IPodList>
}

class DockerUiService extends BaseService implements IDockerUiService {
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

    getPodList(): ng.IPromise <kubernetes.IPodList> {
        var deferred = this.qService.defer();
        var config = this.newDefaultRequestConfig();
        this.httpService.get(this.configuration.DOCKERUI_SERVICE_URL, config)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }

}

sextant.service('dockerUiService', DockerUiService);