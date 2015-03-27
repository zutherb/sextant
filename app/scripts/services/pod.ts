interface IPodService {
    getPodList(): ng.IPromise <IPodList>
    deletePod(podId: string): ng.IPromise <void>
}

class PodService implements IPodService {
    private httpService:ng.IHttpService;
    private qService:ng.IQService;
    private rootScope:ng.IScope;

    static $inject = ['$http', '$q', '$rootScope', 'configuration'];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService,
                private $rootScope:ng.IScope,
                private configuration:IConfiguration) {
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
        this.configuration = configuration;
    }

    getPodList(): ng.IPromise <IPodList> {
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