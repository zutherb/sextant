/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IDockerHubService {
    getSearchResultItems(searchterm: string): ng.IPromise <docker.ISearchResult>
}

class DockerHubService extends BaseService implements IDockerHubService {
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

    getSearchResultItems(searchterm: string): ng.IPromise <docker.ISearchResult> {
        var deferred: ng.IDeferred<docker.ISearchResult> = this.qService.defer();
        var config: ng.IRequestShortcutConfig = this.newDefaultRequestConfig();
        config.params =  { q: searchterm };
        this.httpService.get(this.configuration.DOCKER_HUB_SEARCH_URL, config)
            .success((data: docker.ISearchResult) => deferred.resolve(data))
            .error((error: any) => { console.log(error); });
        return deferred.promise;
    }

}

sextant.service('dockerHubService', DockerHubService);