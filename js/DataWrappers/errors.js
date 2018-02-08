import {NavigationErrorMessage} from "../Types/enums";

export class IntegrationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'IntegrationError';
    }
}

export class NavigationError extends Error {
    constructor(message: NavigationErrorMessage) {
        super(message);
        this.name = 'NavigationError';
    }
}

export class NoActivityError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NoActivityError';
    }
}

export class DeviceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DeviceError';
    }
}