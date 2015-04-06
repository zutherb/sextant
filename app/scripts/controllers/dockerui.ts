/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/minion.ts"/>
/// <reference path="../services/dockerui.ts"/>
'use strict';

class DockerUiController {
    static $inject: string [] = ['dockerUiService'];

    dockerUiPods: kubernetes.IPod [] = [];

    constructor(private dockerUiService: DockerUiService) {
        dockerUiService.getPodList().then((data: kubernetes.IPodList) =>  {
            this.dockerUiPods = data.items;
        });
    }

    isDockerUiNotRunningOnHost(hostIP: string): boolean {
        var pods: kubernetes.IPod [] = this.podsByHost(hostIP);
        return _.isEmpty(pods);
    }

    getDockerUiPodIPByHost(hostIP: string): string {
        var pods: kubernetes.IPod [] = this.podsByHost(hostIP);
        return pods[0].id;
    }

    podsByHost(hostIP: string): kubernetes.IPod [] {
        return _.filter(this.dockerUiPods, (pod: kubernetes.IPod) => pod.currentState.hostIP === hostIP);
    }
}