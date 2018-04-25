import {IntegrationModule} from '../NativeModules';
import {Intent} from '../DataWrappers/navigation';
import type {
    BroadcastEventListener,
    BroadcastEventType,
    IntegrationServiceEventResult,
    ServiceEventListener,
    ServiceEventType
} from '../Types/inbuilt';
import EventHolder from '../Utilities/EventHolder';
import Converter from '../Utilities/Converter';
import ErrorHandler from '../Utilities/ErrorHandler';

export class IntegrationCallback {

    constructor(eventName) {
        this._eventName = eventName;
    }

    onResult(result: IntegrationServiceEventResult): Promise<void> {
        return this._process({data: result});
    }

    startActivity(intent: Intent): Promise<void> {
        return this._process({intent: Converter.writeIntent(intent)});
    }

    skip(): Promise<void> {
        return this._process({});
    }

    _process(result) {
        return new Promise((resolve, reject) => IntegrationModule.setIntegrationResult(this._eventName, result, ErrorHandler.getExecutor(resolve, reject)));
    }

}

export class ServiceAPI {

    static addEventListener(type: ServiceEventType, listener: ServiceEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    static removeEventListener(type: ServiceEventType, listener?: ServiceEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}

export class BroadcastReceiver {

    static addEventListener(type: BroadcastEventType, listener: BroadcastEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    static removeEventListener(type: BroadcastEventType, listener?: BroadcastEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}