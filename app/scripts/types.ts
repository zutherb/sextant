interface IConfiguration {
    EVENT_SERVICE_URL: string;
    MINION_SERVICE_URL: string;
    POD_SERVICE_URL: string;
    RC_SERVICE_URL: string;
    DOCKERUI_SERVICE_URL: string;
    NUMBER_OF_ITEMS_PER_PAGE: number;
    NUMBER_OF_DISPLAYED_PAGES: number;
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

interface IPodList extends IKubernetesBaseObject {
    items: IPod [];
}

interface IPod extends IKubernetesItemBaseObject {
    namespace: string;
    generateName: string;
    labels: any;
    desiredState: IDesiredState;
    currentState: ICurrentState;
}

interface IDesiredState {
    manifest: IManifest;
    host: string;
}

interface ICurrentState {
    status: string;
    hostIP: string;
}

interface IManifest {
    version: string;
    id: string;
    volumes: any;
    containers: IContainer [];
    restartPolicy:any;
    dnsPolicy: string;
}

interface IContainer {
    name: string;
    image: string;
    ports: IPort [];
    resources: any;
    terminationMessagePath: string;
    imagePullPolicy: string;
    capabilities: any;
}

interface IPort {
    hostPort: number;
    containerPort: number;
    protocol: string;
}

interface IReplicationControllerList extends IKubernetesBaseObject {
    items: IPod [];
}