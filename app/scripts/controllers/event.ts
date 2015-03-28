/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/event.ts"/>

interface IEventListScope extends ng.IScope {
    vm: EventListController;
}

class EventListController {
    events: kubernetes.IEvent [] = [];
    displayedEvents: kubernetes.IEvent [] = [];

    searchterm: string;
    itemsByPage: number;
    displayedPages: number;

    static $inject = ['$scope', '$routeParams', 'eventService', 'configuration'];

    constructor(private $scope,
                private $routeParams,
                private eventService: IEventService,
                private configuration: sextant.IConfiguration) {

        this.searchterm = $routeParams.searchterm;

        eventService.getEventList().then((data: kubernetes.IEventList) =>  {
            this.events = data.items;
            this.displayedEvents = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }
}

sextant.controller('eventListController', EventListController);
