/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="base.ts"/>
'use strict';

interface IEventService {
    getEventList(): ng.IPromise <kubernetes.IEventList>
}

class EventService extends BaseService implements IEventService {
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

    getEventList(): ng.IPromise <kubernetes.IEventList> {
        var deferred = this.qService.defer();
        this.httpService.get(this.configuration.EVENT_SERVICE_URL, this.newDefaultRequestConfig())
            .success((data) => deferred.resolve(data))
            .error((error:any) => {
                console.log(error);
            });
        return deferred.promise;
    }
}

sextant.service('eventService', EventService);