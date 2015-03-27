interface ILoadBalancerService {
    getLoadBalancerList(): ng.IPromise <IPodList>
}

class LoadBalancerService implements ILoadBalancerService {
    private httpService:ng.IHttpService;
    private qService:ng.IQService;
    private rootScope:ng.IScope

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

    getLoadBalancerList(): ng.IPromise <IPodList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.POD_SERVICE_URL)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {});
        return deferred.promise;
    }
}

sextant.service('loadBalancerService', LoadBalancerService);