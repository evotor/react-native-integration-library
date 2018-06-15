/**
 * Классы, используемые для навигации.
 * @module navigation
 */
import {NavigationModule} from '../NativeModules';
import {Intent} from '../DataWrappers/navigation';
import type {IntegrationServiceEventResult, NavigationEventListener} from '../Types/inbuilt';
import {NavigationEventType} from '../Types/compilable';
import {
    BeforePositionsEditedEventResult,
    PaymentSelectedEventResult,
    PrintExtraRequiredEventResult,
    PrintGroupRequiredEventResult,
    ReceiptDiscountEventResult
} from '../DataWrappers/services/results';
import Converter from '../Utilities/Converter';
import EventHolder from '../Utilities/EventHolder';
import ErrorHandler from '../Utilities/ErrorHandler';
import {IntegrationError} from "../DataWrappers/errors";

/**
 * @class NavigationAPI
 * @classdesc Класс, с помощью методов которого можно управлять текущей операцией, а также запускать другие операции или службы.
 * @hideconstructor
 * @memberof module:navigation
 */
export default class NavigationAPI {

    static RESULT_CANCELED = 0;
    static RESULT_FIRST_USER = 1;
    static RESULT_OK = -1;

    /**
     * Создаёт намерение для формы редактирования чека продажи.
     * @function module:navigation.NavigationAPI.createIntentForSellReceiptEdit
     * @returns {Intent} Созданное намерение
     */
    static createIntentForSellReceiptEdit(): Intent {
        return new Intent().setAction('evotor.intent.action.edit.SELL');
    }

    /**
     * Создаёт намерение для формы редактирования чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptEdit
     * @returns {Intent} Созданное намерение
     */
    static createIntentForPaybackReceiptEdit(): Intent {
        return new Intent().setAction('evotor.intent.action.edit.PAYBACK');
    }

    /**
     * Создаёт намерение для формы оплаты чека продажи.
     * @function module:navigation.NavigationAPI.createIntentForSellReceiptPayment
     * @returns {Intent} Созданное намерение
     */
    static createIntentForSellReceiptPayment(): Intent {
        return new Intent().setAction('evotor.intent.action.payment.SELL');

    }

    /**
     * Создаёт намерение для формы оплаты чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptPayment
     * @returns {Intent} Созданное намерение
     */
    static createIntentForPaybackReceiptPayment(): Intent {
        return new Intent().setAction('evotor.intent.action.payment.PAYBACK');
    }

    /**
     * Создаёт намерение для формы настроек кассового чека.
     * @function module:navigation.NavigationAPI.createIntentForCashReceiptSettings
     * @returns {Intent} Созданное намерение
     */
    static createIntentForCashReceiptSettings(): Intent {
        return new Intent().setAction('evotor.intent.action.settings.CASH_RECEIPT');
    }

    /**
     * Создаёт намерение для формы кассового отчёта.
     * @function module:navigation.NavigationAPI.createIntentForCashRegisterReport
     * @returns {Intent} Созданное намерение
     */
    static createIntentForCashRegisterReport(): Intent {
        return new Intent().setAction('evotor.intent.action.report.CASH_REGISTER');
    }

    /**
     * Создаёт намерение для формы смены пользователя.
     * @function module:navigation.NavigationAPI.createIntentForChangeUser
     * @returns {Intent} Созданное намерение
     */
    static createIntentForChangeUser(): Intent {
        return new Intent().setAction('evotor.intent.action.user.CHANGE');
    }

    /**
     * Создаёт намерение для формы редактирования чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptEdit
     * @returns {Intent} Созданное намерение
     */
    static createIntentForNewProduct(barcode?: string): Intent {
        return new Intent().setAction('evotor.intent.action.edit.PRODUCT').putExtra('barcode', barcode);
    }

    /**
     * Создаёт намерение для формы редактирования чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptEdit
     * @returns {Intent} Созданное намерение
     */
    static createIntentForEditProduct(productUuid?: string): Intent {
        return new Intent().setAction('evotor.intent.action.edit.PRODUCT').putExtra('productUuid', productUuid);
    }

    /**
     * Проверяет, запущена ли операция текущего приложения.
     * @function module:navigation.NavigationAPI.currentActivityIsRunning
     * @returns {Promise<boolean>} Результат проверки
     */
    static currentActivityIsRunning(): Promise<boolean> {
        return new Promise(resolve => NavigationModule.currentActivityIsRunning(resolve));
    }

    /**
     * Получает намерение, с помощью которого была запущена текущая операция.
     * @function module:navigation.NavigationAPI.getIntent
     * @returns {Promise<Intent>} Намерение
     * @throws {module:errors.NavigationError}
     */
    static getIntent(): Promise<Intent> {
        return new Promise((resolve, reject) => NavigationModule.getIntent(ErrorHandler.getExecutor(Converter.getIntentReader(resolve), reject)));
    }

    /**
     * Запускает операцию.
     * @function module:navigation.NavigationAPI.startActivity
     * @param {Intent} intent - Намерение с описанием целевой операции
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError}
     */
    static startActivity(intent: Intent): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.startActivity(Converter.writeIntent(intent), ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Запускает операцию для получения результата после её завершения.
     * @function module:navigation.NavigationAPI.startActivity
     * @param {Intent} intent - Намерение с описанием целевой операции
     * @param {number} requestCode - Код запроса ответа
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError}
     */
    static startActivityForResult(intent: Intent, requestCode: number): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.startActivityForResult(Converter.writeIntent(intent), requestCode, ErrorHandler.getExecutor(resolve, reject)));
    }

    static startService(intent: Intent): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.startService(Converter.writeIntent(intent), ErrorHandler.getExecutor(resolve, reject)));
    }

    static setResult(resultCode: number, data?: Intent): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.setResult(resultCode, data ? Converter.writeIntent(data) : null, ErrorHandler.getExecutor(resolve, reject)));
    }

    static setIntegrationResult(result: IntegrationServiceEventResult): Promise<void> {
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
        } else if (result.__name__ === 'PaymentSystemPaymentOkResult' || result.__name__ === 'PaymentSystemPaymentErrorResult') {
            type = 'PAYMENT_SYSTEM';
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

    static finish(): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.finish(ErrorHandler.getExecutor(resolve, reject)));
    }

    static addEventListener(type: NavigationEventType, listener: NavigationEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    static removeEventListener(type: NavigationEventType, listener?: NavigationEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}