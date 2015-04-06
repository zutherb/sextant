/// <reference path="../__all.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="../types.ts"/>
'use strict';

interface IBaseService {
    newDefaultRequestConfig(): ng.IRequestShortcutConfig;
}

class BaseService implements IBaseService {

    constructor(protected configuration: sextant.IConfiguration) {}

    newDefaultRequestConfig(): ng.IRequestShortcutConfig {
        return {
            timeout: this.configuration.TIMEOUT
        };
    }
}