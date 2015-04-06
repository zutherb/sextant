/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../services/minion.ts"/>
/// <reference path="../services/dockerui.ts"/>
'use strict';

class DockerUiController {
    dockerUiPods: kubernetes.IPod [] = [];

    static $inject = ['dockerUiService'];

    constructor(private dockerUiService: DockerUiService) {
        dockerUiService.getPodList().then((data: kubernetes.IPodList) =>  {
            this.dockerUiPods = data.items;
        });
    }

    isDockerUiNotRunningOnHost(hostIP: string): boolean {
        var pods = this.podsByHost(hostIP);
        return _.isEmpty(pods);
    }

    getDockerUiPodIPByHost(hostIP: string): string {
        var pods = this.podsByHost(hostIP);
        return pods[0].id;
    }

    podsByHost(hostIP) {
        return _.filter(this.dockerUiPods, (pod:kubernetes.IPod) => pod.currentState.hostIP === hostIP);
    }
}