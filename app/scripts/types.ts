interface IConfiguration {
    EVENT_SERVICE_URL: string;
    MINION_SERVICE_URL: string;
}

interface IKubernetesBaseObject {
    creationTimestamp: string;
    selfLink: string;
    apiVersion: string;
    kind: string;
    resourceVersion: number;
}

interface IKubernetesItemBaseObject {
    id: string;
    uid: string;
    selfLink: string;
    resourceVersion: number;
}

interface IEventList extends IKubernetesBaseObject {
    items: IEvent [];
}

interface IEvent extends IKubernetesItemBaseObject {
    id: string;
    uid: string;
    namespace: string;
    involvedObject: IInvolvedObject;
    reason: string;
    message: string;
    source: string;
    host: string;
    timestamp: string;
    firstTimestamp: string;
    lastTimestamp: string;
    count: number;
}

interface IInvolvedObject {
    kind: string;
    namespace: string;
    name: string;
    uid: string;
    fieldPath: string;
}

interface IMinionList extends IKubernetesBaseObject {
    items: IMinion [];
}

interface IMinion extends IKubernetesItemBaseObject {
    hostIP: string;
    resources: IResources;
    status: IStatus;
}

interface IResources {
    capacity: ICapacity;
}

interface ICapacity {
    cpu: number;
    memory: number;
}

interface IStatus {
    conditions: IConditions;
    addresses: IAddress;
    nodeInfo: INodeInfo;
}

interface IConditions {
    kind: string;
    status: string;
    lastProbeTime: string;
    lastTransitionTime: string;
    reason: string;
}

interface IAddress {
    type: string;
    address: string;
}

interface INodeInfo {
    machineID: string;
    systemUUID: string;
}