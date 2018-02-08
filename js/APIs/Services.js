import {IntegrationModule} from '../NativeModules';
import {Intent} from '../DataWrappers/navigation';
import type {
    IntegrationServiceEventResult,
    BroadcastEventListener, ServiceEventType, ServiceEventListener, BroadcastEventType
} from '../Types/types';
import {IntegrationServiceEventType} from '../Types/enums';
import EventHolder from '../Utilities/EventHolder';
import Converter from '../Utilities/Converter';
import ErrorHandler from '../Utilities/ErrorHandler';

export class IntegrationCallback {

    constructor(eventName) {
        this._eventName = eventName;
    }

    onResult(result: IntegrationServiceEventResult): Promise {
        return this._process({data: result});
    }

    startActivity(intent: Intent): Promise {
        return this._process({intent: Converter.writeIntent(intent)});
    }

    skip(): Promise {
        return this._process({});
    }

    _process(result) {
        return new Promise((resolve, reject) => IntegrationModule.setIntegrationResult(this._eventName, result, ErrorHandler.getExecutor(resolve, reject)));
    }

}

export class ServiceAPI {

    static addEventListener(type: ServiceEventType, listener: ServiceEventListener, isGlobal: boolean = true): void {
        let listenerResult = listener;
        if (IntegrationServiceEventType.hasOwnProperty(type)) {
            const callback = new IntegrationCallback(type);
            if (type === 'RECEIPT_DISCOUNT') {
                listenerResult = Converter.getReceiptDiscountEventReader(listener, callback);
            } else if (type === 'BEFORE_POSITIONS_EDITED') {
                listenerResult = Converter.getBeforePositionsEditedEventReader(listener, callback);
            } else if (type === 'PAYMENT_SYSTEM') {
                listenerResult = Converter.getPaymentSystemEventReader(listener, callback);
            } else {
                listenerResult = (eventData) => {
                    listener(eventData, callback);
                };
            }
        }
        EventHolder.addEventListener(type, listenerResult, isGlobal);
    }

    static removeEventListener(type: ServiceEventType, listener?: ServiceEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}

export class BroadcastReceiver {

    static addEventListener(type: BroadcastEventType, listener: BroadcastEventListener, isGlobal: boolean = true): void {
        const listenerResult = Converter.getBroadcastEventReader(type, listener);
        if(listenerResult) {
            EventHolder.addEventListener(type, listenerResult, isGlobal);
        }
    }

    static removeEventListener(type: BroadcastEventType, listener?: BroadcastEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}