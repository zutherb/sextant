interface IConfiguration {
    EVENT_SERVICE_URL: string
}

interface IBaseObject {
    creationTimestamp: string;
    selfLink: string;
}

interface IEventList extends IBaseObject {
    kind: string;
    apiVersion: string;
    items: IEvent [];
}

interface IEvent extends IBaseObject {
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
