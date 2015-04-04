/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/pod.ts"/>
'use strict';

class PodEditController {
    pod: kubernetes.IPod;
    isNew: boolean;

    static $inject = ['$scope', '$routeParams', 'podService', 'configuration'];

    constructor(private $scope,

                private $routeParams,
                private podService: IPodService,
                private configuration: sextant.IConfiguration) {


        if(!_.isEmpty($routeParams.podid)){
            podService.getPod($routeParams.podid).then((data: kubernetes.IPod) => {
                this.pod = data;
                this.isNew = false;
            });
        } else {
            this.pod = {};
            this.pod.desiredState.manifest.containers = [];
            this.isNew = true;
        }

        $scope.vm = this;
    }

    deleteContainer(container: kubernetes.IContainer): void {
        var containers = _.without(this.pod.desiredState.manifest.containers, container);
        this.pod.desiredState.manifest.containers = containers;
    }

    addContainer(): void{
        this.pod.desiredState.manifest.containers.push({ports: []});
    }

    deletePort(container: kubernetes.IContainer, port: kubernetes.IPort): void {
        var index: number = this.pod.desiredState.manifest.containers.indexOf(container);
        var ports: kubernetes.IPort [] = this.pod.desiredState.manifest.containers[index].ports;
        this.pod.desiredState.manifest.containers[index].ports = _.without(ports, port);
    }

    addPort(container: kubernetes.IContainer): void {
        var index = this.pod.desiredState.manifest.containers.indexOf(container);
        this.pod.desiredState.manifest.containers[index].ports.push({});
    }

    update(): void {
        console.log(this.pod);
    }
}

sextant.controller('podEditController', PodEditController);
