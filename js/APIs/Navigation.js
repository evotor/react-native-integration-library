/**
 * Классы, используемые для навигации.
 * @module navigation
 */
import {NavigationModule} from '../NativeModules';
import {Intent} from '../DataWrappers/navigation';
import type {IntegrationServiceEventResult, NavigationEventListener} from '../Types/inbuilt';
import {IntegrationServiceEventType, NavigationEventType} from '../Types/compilable';
import {
    BeforePositionsEditedEventResult,
    PaymentDelegatorCanceledAllEventResult,
    PaymentDelegatorCanceledEventResult,
    PaymentDelegatorSelectedEventResult,
    PaymentSelectedEventResult,
    PaymentSystemPaymentErrorResult,
    PaymentSystemPaymentOkResult,
    PrintExtraRequiredEventResult,
    PrintGroupRequiredEventResult,
    ReceiptDiscountEventResult
} from '../DataWrappers/services/results';
import Converter from '../Utilities/Converter';
import EventHolder from '../Utilities/EventHolder';
import ErrorHandler from '../Utilities/ErrorHandler';
import {IntegrationError} from "../DataWrappers/errors";

/**
 * @class module:navigation.NavigationAPI
 * @classdesc С помощью методов класса можно управлять текущей операцией, а также запускать другие операции или службы.
 * @hideconstructor
 * @see [Подробнее об устройстве навигации]{@link http://developer.evotor.ru/docs/tobipizda}
 */
export default class NavigationAPI {

    static RESULT_CANCELED = 0;
    static RESULT_FIRST_USER = 1;
    static RESULT_OK = -1;

    /**
     * Создаёт намерение для формы редактирования чека продажи.
     * @function module:navigation.NavigationAPI.createIntentForSellReceiptEdit
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForSellReceiptEdit(): Intent {
        return new Intent().setAction('evotor.intent.action.edit.SELL');
    }

    /**
     * Создаёт намерение для формы редактирования чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptEdit
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForPaybackReceiptEdit(): Intent {
        return new Intent().setAction('evotor.intent.action.edit.PAYBACK');
    }

    /**
     * Создаёт намерение для формы оплаты чека продажи.
     * @function module:navigation.NavigationAPI.createIntentForSellReceiptPayment
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForSellReceiptPayment(): Intent {
        return new Intent().setAction('evotor.intent.action.payment.SELL');

    }

    /**
     * Создаёт намерение для формы оплаты чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptPayment
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForPaybackReceiptPayment(): Intent {
        return new Intent().setAction('evotor.intent.action.payment.PAYBACK');
    }

    /**
     * Создаёт намерение для формы настроек кассового чека.
     * @function module:navigation.NavigationAPI.createIntentForCashReceiptSettings
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForCashReceiptSettings(): Intent {
        return new Intent().setAction('evotor.intent.action.settings.CASH_RECEIPT');
    }

    /**
     * Создаёт намерение для формы кассового отчёта.
     * @function module:navigation.NavigationAPI.createIntentForCashRegisterReport
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForCashRegisterReport(): Intent {
        return new Intent().setAction('evotor.intent.action.report.CASH_REGISTER');
    }

    /**
     * Создаёт намерение для формы смены пользователя.
     * @function module:navigation.NavigationAPI.createIntentForChangeUser
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForChangeUser(): Intent {
        return new Intent().setAction('evotor.intent.action.user.CHANGE');
    }

    /**
     * Создаёт намерение для формы редактирования чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptEdit
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForNewProduct(barcode?: string): Intent {
        return new Intent().setAction('evotor.intent.action.edit.PRODUCT').putExtra('barcode', barcode);
    }

    /**
     * Создаёт намерение для формы редактирования чека возврата.
     * @function module:navigation.NavigationAPI.createIntentForPaybackReceiptEdit
     * @returns {module:navigation.Intent} Созданное намерение
     */
    static createIntentForEditProduct(productUuid?: string): Intent {
        return new Intent().setAction('evotor.intent.action.edit.PRODUCT').putExtra('productUuid', productUuid);
    }

    /**
     * Проверяет, запущена ли операция текущего приложения.
     * @function module:navigation.NavigationAPI.currentActivityIsRunning
     * @returns {Promise<boolean>} Результат проверки
     * @throws {module:errors.NoActivityError}
     */
    static currentActivityIsRunning(): Promise<boolean> {
        return new Promise(resolve => NavigationModule.currentActivityIsRunning(resolve));
    }

    /**
     * Получает намерение, с помощью которого была запущена текущая операция.
     * @function module:navigation.NavigationAPI.getIntent
     * @returns {Promise<module:navigation.Intent>} Намерение
     * @throws {module:errors.NoActivityError}
     */
    static getIntent(): Promise<Intent> {
        return new Promise((resolve, reject) => NavigationModule.getIntent(ErrorHandler.getExecutor(Converter.getIntentReader(resolve), reject)));
    }

    /**
     * Запускает операцию.
     * @function module:navigation.NavigationAPI.startActivity
     * @param {module:navigation.Intent} intent - Намерение с описанием целевой операции
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError | module:errors.NoActivityError}
     */
    static startActivity(intent: Intent): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.startActivity(Converter.writeIntent(intent), ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Запускает операцию для получения результата после её завершения.
     * @function module:navigation.NavigationAPI.startActivityForResult
     * @param {module:navigation.Intent} intent - Намерение с описанием целевой операции
     * @param {number} requestCode - Код запроса ответа
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError | module:errors.NoActivityError}
     */
    static startActivityForResult(intent: Intent, requestCode: number): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.startActivityForResult(Converter.writeIntent(intent), requestCode, ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Запускает службу.
     * @function module:navigation.NavigationAPI.startService
     * @param {module:navigation.Intent} intent - Намерение с описанием целевой службы
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError | module:errors.NoActivityError}
     */
    static startService(intent: Intent): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.startService(Converter.writeIntent(intent), ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Устанавливает результат, который получит та операция, из которой с помощью метода [startActivityForResult]{@link module:navigation.NavigationAPI.startActivityForResult} была запущена текущая операция.
     * @function module:navigation.NavigationAPI.setResult
     * @param {number} resultCode - Код результата для возвращения в исходную операцию.
     * @param {?module:navigation.Intent} data - Данные для возвращения в исходную операцию.
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError | module:errors.NoActivityError}
     */
    static setResult(resultCode: number, data?: Intent): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.setResult(resultCode, data ? Converter.writeIntent(data) : null, ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Устанавливает результат события интеграционной службы, из которой была запущена текущая интеграционная операция. Важно, чтобы текущая операция была унаследована от ReactIntegrationActivity.
     * @function module:navigation.NavigationAPI.setIntegrationResult
     * @param {module:services#IntegrationServiceEventResult} result - Результат
     * @returns {Promise<void>}
     * @throws {module:errors.NavigationError | module:errors.NoActivityError | module:errors.IntegrationError}
     */
    static setIntegrationResult(result: IntegrationServiceEventResult): Promise<void> {
        let type;
        switch (result.__name__) {
            case "BeforePositionsEditedEventResult":
                type = IntegrationServiceEventType.BEFORE_POSITIONS_EDITED;
                break;
            case "ReceiptDiscountEventResult":
                type = IntegrationServiceEventType.RECEIPT_DISCOUNT;
                break;
            case "PaymentSelectedEventResult":
                type = IntegrationServiceEventType.PAYMENT_SELECTED;
                break;
            case "PrintGroupRequiredEventResult":
                type = IntegrationServiceEventType.PRINT_GROUP_REQUIRED;
                break;
            case "PrintExtraRequiredEventResult":
                type = IntegrationServiceEventType.PRINT_EXTRA_REQUIRED;
                break;
            case "PaymentSystemPaymentOkResult" :
            case "PaymentSystemPaymentErrorResult":
                type = IntegrationServiceEventType.PAYMENT_SYSTEM;
                break;
            case "PaymentDelegatorSelectedEventResult":
            case "PaymentDelegatorCanceledEventResult":
            case "PaymentDelegatorCanceledAllEventResult":
                type = IntegrationServiceEventType.PAYMENT_DELEGATOR;
                break;
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

    /**
     * Завершает текущую операцию
     * @function module:navigation.NavigationAPI.finish
     * @returns {Promise<void>}
     * @throws {module:errors.NoActivityError}
     */
    static finish(): Promise<void> {
        return new Promise((resolve, reject) => NavigationModule.finish(ErrorHandler.getExecutor(resolve, reject)));
    }

    /**
     * Добавляет слушатель навигационного события.
     * @function module:navigation.NavigationAPI.addEventListener
     * @param {module:navigation#NavigationEventType} type - Тип события
     * @param {module:navigation#NavigationEventListener} listener - Слушатель события
     * @returns {void}
     */
    static addEventListener(type: NavigationEventType, listener: NavigationEventListener): void {
        EventHolder.addEventListener(...arguments);
    }

    /**
     * Удаляет слушатель навигационного события.
     * @function module:navigation.NavigationAPI.removeEventListener
     * @param {module:navigation#NavigationEventType} type - Тип события
     * @param {module:navigation#NavigationEventListener} [listener] - Слушатель события. В случае, если он не указан, будут удалены все слушатели указанного типа события.
     * @returns {boolean} Удалён ли слушатель
     */
    static removeEventListener(type: NavigationEventType, listener?: NavigationEventListener): boolean {
        return EventHolder.removeEventListener(...arguments);
    }

}