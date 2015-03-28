/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>

interface IDockerUiService {
    getPodList(): ng.IPromise <kubernetes.IPodList>
}

class DockerUiService implements IDockerUiService {
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
        this.configuration = configuration;
    }

    getPodList(): ng.IPromise <kubernetes.IPodList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.DOCKERUI_SERVICE_URL)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {});
        return deferred.promise;
    }

}

sextant.service('dockerUiService', DockerUiService);