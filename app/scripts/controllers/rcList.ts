/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/rc.ts"/>
'use strict';

class ReplicationControllerListController {
    static $inject: string [] = [
        '$scope',
        '$routeParams',
        'rcService',
        'FileUploader',
        'configuration'];

    rcs: kubernetes.IReplicationController [] = [];
    displayedRcs: kubernetes.IReplicationController [] = [];

    searchterm: string;
    itemsByPage: number;
    displayedPages: number;

    uploader: any;

    constructor(private $scope: any,
                private $routeParams: any,
                private rcService: IReplicationControllerService,
                private FileUploader: any,
                private configuration: sextant.IConfiguration) {

        this.uploader = new FileUploader({
            //url: '/api/kubernetes/replicationControllers'
            url: '/api/v1beta2/replicationControllers'
        });

        this.uploader.onAfterAddingFile = (fileItem: any) => { fileItem.upload(); };
        this.uploader.onCompleteAll = () => { this.updateReplicationControllers(); };


        this.searchterm = $routeParams.searchterm;

        rcService.getReplicationControllerList().then((data: kubernetes.IReplicationControllerList) =>  {
            this.rcs = data.items;
            this.displayedRcs = [].concat(data.items);
        });

        this.itemsByPage = configuration.NUMBER_OF_ITEMS_PER_PAGE;
        this.displayedPages = configuration.NUMBER_OF_DISPLAYED_PAGES;

        $scope.vm = this;
    }

    delete(rc: kubernetes.IReplicationController): void {
        this.rcService.delete(rc).then((data: kubernetes.IReplicationControllerList) =>  {
            this.updateReplicationControllers();
        });
    }

    update(rc: kubernetes.IReplicationController): void {
        this.rcService.update(rc);
    }

    private updateReplicationControllers(): void {
        this.rcService.getReplicationControllerList().then((data: kubernetes.IReplicationControllerList) => {
            this.rcs = data.items;
        });
    }
}

sextant.controller('rcListController', ReplicationControllerListController);
