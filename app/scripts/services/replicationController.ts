interface IReplicationControllerService {
    getReplicationControllerList(): ng.IPromise <kubernetes.IPodList>
}

class ReplicationControllerService implements IReplicationControllerService {
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope

    static $inject = ['$http', '$q', '$rootScope', 'configuration'];

    constructor(private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $rootScope: ng.IScope,
                private configuration: sextant.IConfiguration) {
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
    }

    getReplicationControllerList(): ng.IPromise <kubernetes.IReplicationControllerList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.RC_SERVICE_URL)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {});
        return deferred.promise;
    }
}

sextant.service('rcService', ReplicationControllerService);