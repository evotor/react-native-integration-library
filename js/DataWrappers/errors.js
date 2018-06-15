/**
 * Ошибки, возникающие при работе с библиотекой.
 * @module errors
 */
import {NavigationErrorMessage} from "../Types/compilable";

/** Ошибка интеграции. Может возникнуть при [обработке события интеграционной службы]{@link module:services.IntegrationCallback}, при работе с интеграционной операцией, а также при выполнении команд классов [ReceiptAPI]{@link module:receipt.ReceiptAPI}, [SessionAPI]{@link module:session.SessionAPI}.*/
export class IntegrationError extends Error {
    /**
     * @param {string} message - Сообщение
     */
    constructor(message: string) {
        super(message);
        this.name = 'IntegrationError';
    }
}

/** Ошибка навигации. Может возникнуть при попытке запуска операции или службы.*/
export class NavigationError extends Error {
    /**
     * @param {NavigationErrorMessage} message - Сообщение
     */
    constructor(message: NavigationErrorMessage) {
        super(message);
        this.name = 'NavigationError';
    }
}

/** Ошибка операции. Возникает при вызове метода операции за её пределами.*/
export class NoActivityError extends Error {
    /**
     * @param {string} message - Сообщение
     */
    constructor(message: string) {
        super(message);
        this.name = 'NoActivityError';
    }
}

/** Ошибка устройства. Может возникнуть при работе с [принтером чеков]{@link module:devices.Printer} и [весами]{@link module:devices.Scales}.*/
export class DeviceError extends Error {
    /**
     * @param {string} message - Сообщение
     */
    constructor(message: string) {
        super(message);
        this.name = 'DeviceError';
    }
}