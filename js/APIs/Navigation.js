import {NavigationModule} from '../NativeModules';
import {Intent} from '../DataWrappers/navigation';
import type {IntegrationServiceEventResult, NavigationEventListener} from '../Types/types';
import {NavigationEventType} from '../Types/enums';
import {
    PrintExtraRequiredEventResult} from '../DataWrappers/services/results';
import Converter from '../Utilities/Converter';
import EventHolder from '../Utilities/EventHolder';
import ErrorHandler from '../Utilities/ErrorHandler';
import {IntegrationError} from "../DataWrappers/errors";
import {
    BeforePositionsEditedEventResult, PaymentSelectedEventResult, PrintGroupRequiredEventResult,
    ReceiptDiscountEventResult
} from "../DataWrappers/services/results";

export default class NavigationAPI {

    static RESULT_CANCELED = 0;
    static RESULT_FIRST_USER = 1;
    static RESULT_OK = -1;

    static createIntentForSellReceiptEdit(): Intent {
        const result = new Intent();
        result.setAction('evotor.intent.action.edit.SELL');
        return result;
    }

    static createIntentForPaybackReceiptEdit(): Intent {
        const result = new Intent();
        result.setAction('evotor.intent.action.edit.PAYBACK');
        return result;
    }

    static createIntentForSellReceiptPayment(): Intent {
        const result = new Intent();
        result.setAction('evotor.intent.action.payment.SELL');
        return result;
    }

    static createIntentForPaybackReceiptPayment(): Intent {
        const result = new Intent();
        result.setAction('evotor.intent.action.payment.PAYBACK');
        return result;
    }

    static createIntentForCashReceiptSettings(): Intent {
        const result = new Intent();
        result.setAction('evotor.intent.action.settings.CASH_RECEIPT');
        return result;
    }

    static createIntentForCashRegisterReport(): Intent {
        const result = new Intent();
        result.setAction('evotor.intent.action.report.CASH_REGISTER');
        return result;
    }

    static getIntent(): Promise<Intent> {
        return new Promise((resolve, reject) => NavigationModule.getIntent(ErrorHandler.getExecutor(Converter.getIntentReader(resolve), reject)));
    }

    static startActivity(intent: Intent): Promise {
        return new Promise((resolve, reject) => NavigationModule.startActivity(Converter.writeIntent(intent), ErrorHandler.getExecutor(resolve, reject)));
    }

    static startActivityForResult(intent: Intent, requestCode: number): Promise {
        return new Promise((resolve, reject) => NavigationModule.startActivityForResult(Converter.writeIntent(intent), requestCode, ErrorHandler.getExecutor(resolve, reject)));
    }

    static startService(intent: Intent): Promise {
        return new Promise((resolve, reject) => NavigationModule.startService(Converter.writeIntent(intent), ErrorHandler.getExecutor(resolve, reject)));
    }

    static setResult(resultCode: number, data?: Intent): Promise {
        return new Promise((resolve, reject) => NavigationModule.setResult(resultCode, data ? Converter.writeIntent(data) : null, ErrorHandler.getExecutor(resolve, reject)));
    }

    static setIntegrationResult(result: IntegrationServiceEventResult): Promise {
        let type;
        if (result.__name__ === 'BeforePositionsEditedEventResult') {
            type = 'BEFORE_POSITIONS_EDITED';
        } else if (result.__name__ === 'ReceiptDiscountEventResult') {
            type = 'RECEIPT_DISCOUNT';
        } else if (result.__name__ === 'PaymentSelectedEventResult') {
            type = 'PAYMENT_SELECTED';
        } else if (result.__name__ === 'PrintGroupRequiredEventResult') {
            type = 'PRINT_GROUP_REQUIRED';
        } else if (result.__name__ === 'PrintExtraRequiredEventResult') {
            type = 'PRINT_EXTRA_REQUIRED';
        }
        return new Promise(
            (resolve, reject) => {
                if (!type) {
                    throw new IntegrationError("Wrong result! (must be of type IntegrationEventResult)")
                }
                NavigationModule.setIntegrationResult(type, result, ErrorHandler.getExecutor(resolve, reject))
            }
        );
    }

    static finish(): Promise {
        return new Promise((resolve, reject) => NavigationModule.finish(ErrorHandler.getExecutor(resolve, reject)));
    }

    static addEventListener(type: NavigationEventType, listener: NavigationEventListener, isGlobal: boolean = true): void {
        EventHolder.addEventListener(type, Converter.getActivityResultReader(listener), isGlobal);
    }

    static removeEventListener(type: NavigationEventType, listener?: NavigationEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}