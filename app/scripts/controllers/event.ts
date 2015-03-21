/// <reference path="../services/event.ts"/>

interface IEventListScope extends ng.IScope {
    vm: EventListController;
}

class EventListController {
    events: IEvent [];

    static $inject = ['$scope', '$routeParams', 'productService'];

    constructor(private $scope,
                private $routeParams,
                private eventService: IEventService) {

        eventService.getEventList().then((data: IEventList) =>  {
            this.events = data.items;
        });

        $scope.vm = this;
    }
}

sextant.controller('eventListController', EventListController);
