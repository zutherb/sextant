interface IMinionService {
    getMinionList(): ng.IPromise <kubernetes.IMinionList>
}

class MinionService implements IMinionService {
    private httpService: ng.IHttpService;
    private qService: ng.IQService;
    private rootScope: ng.IScope

    static $inject = ['$http', '$q', '$rootScope', 'configuration'];

    constructor(private $http:ng.IHttpService,
                private $q:ng.IQService,
                private $rootScope:ng.IScope,
                private configuration: sextant.IConfiguration) {
        this.httpService = $http;
        this.qService = $q;
        this.rootScope = $rootScope;
        this.configuration = configuration;
    }

    getMinionList(): ng.IPromise <kubernetes.IMinionList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.MINION_SERVICE_URL)
            .success((data) => deferred.resolve(data))
            .error((error:any) => {});
        return deferred.promise;
    }
}

sextant.service('minionService', MinionService);